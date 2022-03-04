import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "../../utils/quill";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";

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
    return (
      categories.data &&
      categories.data.map((c, i) => (
        <FormControlLabel
          sx={{ mb: 0, p: 0 }}
          key={i}
          control={<Checkbox size="small" onChange={handleToggle(c._id)} />}
          label={c.name}
        />
      ))
    );
  };

  const showTags = () => {
    return (
      tags.data &&
      tags.data.map((t, i) => (
        <FormControlLabel
          sx={{ mb: 0, p: 0 }}
          key={i}
          control={<Checkbox size="small" onChange={handleTagsToggle(t._id)} />}
          label={t.name}
        />
      ))
    );
  };

  const showError = () => (
    <Alert sx={{ display: error ? "" : "none" }} severity="error">
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <Alert sx={{ display: success ? "" : "none" }} severity="success">
      {success}
    </Alert>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          fullWidth
          value={title}
          onChange={handleChange("title")}
          margin="dense"
        />

        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={body}
          placeholder="Write something amazing..."
          onChange={handleBody}
        />

        <Button sx={{ mt: 2 }} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Typography variant="h4">Create Blog</Typography>
      <Grid direction="row-reverse" container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box componenet="div" sx={{ mb: 2 }}>
            <Typography variant="h6">Featured image</Typography>
            <Divider />
            <Button sx={{ mt: 2 }} variant="contained" component="label">
              Upload
              <input
                accept="image/*"
                onChange={handleChange("photo")}
                type="file"
                hidden
              />
            </Button>
          </Box>
          <Box componenet="div">
            <Typography variant="h6">Categories</Typography>
            <Divider />
            <FormGroup>{showCategories()}</FormGroup>
          </Box>
          <Box componenet="div">
            <Typography variant="h6">Tags</Typography>
            <Divider />
            <FormGroup>{showTags()}</FormGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box component="div" sx={{ mt: 2 }}>
            {showError()}
            {showSuccess()}
          </Box>
          {createBlogForm()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(MuiCreateBlog);
