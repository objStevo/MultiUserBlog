import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "../../actions/auth";
import { createBlog } from "../../actions/blog";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "../../utils/quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const MuiCreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });

    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: "" });

    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    const checkedNames = categories?.data
      ? categories.data
          .filter((ele, i) => {
            return checked.indexOf(ele._id) > -1;
          })
          .map((ele, i) => {
            return ele.name;
          })
      : [];
    return (
      <Box>
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="categories">Categories</InputLabel>
          <Select
            labelId="select-category"
            id="categories"
            multiple
            value={checkedNames}
            onChange={handleToggle}
            renderValue={(selected) => selected.join(", ")}
            input={<OutlinedInput label="Category" />}
          >
            {categories?.data &&
              categories.data.map((c, i) => (
                <MenuItem key={i} value={c._id} onClick={handleToggle(c._id)}>
                  <Checkbox checked={checked.indexOf(c._id) > -1} />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const showTags = () => {
    const checkedTagsNames = tags?.data
      ? tags.data
          .filter((ele, i) => {
            return checkedTag.indexOf(ele._id) > -1;
          })
          .map((ele, i) => {
            return ele.name;
          })
      : [];

    return (
      <Box>
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="tags">Tags</InputLabel>
          <Select
            labelId="select-tag"
            id="tags"
            multiple
            value={checkedTagsNames}
            onChange={handleTagsToggle}
            renderValue={(selected) => selected.join(", ")}
            input={<OutlinedInput label="Tags" />}
          >
            {tags?.data &&
              tags.data.map((c, i) => (
                <MenuItem
                  key={i}
                  value={c._id}
                  onClick={handleTagsToggle(c._id)}
                >
                  <Checkbox checked={checkedTag.indexOf(c._id) > -1} />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const showError = () => (
    <Alert sx={{ display: error ? "" : "none", mb: 2 }} severity="error">
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <Alert sx={{ display: success ? "" : "none", mb: 2 }} severity="success">
      {success}
    </Alert>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              fullWidth
              value={title}
              onChange={handleChange("title")}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              ".quill .ql-toolbar": {
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: 1,
                borderColor: "primary.gray",
              },
              ".quill .ql-container": { border: 0, minHeight: "200px" },
              ".quill": {
                borderRadius: 1,
                border: 1,
                borderColor: "primary.gray",
              },
            }}
          >
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              placeholder="Write something amazing..."
              onChange={handleBody}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                "&:hover": { bgcolor: "primary.main", color: "primary.light" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ mt: 5, mx: 0, width: "100%" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12} md={7}>
          {showError()}
          {showSuccess()}
          {createBlogForm()}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box componenet="div">
            <FormGroup>{showCategories()}</FormGroup>
          </Box>
          <Box componenet="div" sx={{ mt: 2 }}>
            <FormGroup>{showTags()}</FormGroup>
          </Box>
          <Box componenet="div" sx={{ mt: 3 }}>
            <Typography variant="h6">Featured image</Typography>
            <Divider />
            <Box sx={{ textAlign: "end" }}>
              <Button
                sx={{
                  mt: 2,
                  color: "primary.light",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                variant="contained"
                component="label"
              >
                Upload
                <input
                  accept="image/*"
                  onChange={handleChange("photo")}
                  type="file"
                  hidden
                />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(MuiCreateBlog);
