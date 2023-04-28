import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCookie } from "../../actions/auth";
import { create, getTags, removeTag } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setValues({ ...values, tags: data.data });
      }
    });
  };

  const showTags = () => {
    return tags.map((c, i) => {
      return (
        // Event handlers take callback functions (not invoked), as the parameter, but if need to pass arguments, then we use arrow function
        <buttton
          title="Double click to delete"
          onDoubleClick={() => deleteConfirm(c.slug)}
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </buttton>
      );
    });
  };

  const deleteConfirm = (slug) => {
    console.log("The slug is ", slug);
    let answer = window.confirm("Are you sure you want to delete this Tag");
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    console.log("delete", slug);
    removeTag(slug, token).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault(); //so page doesnt reload
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag created!</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag exists!</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag removed!</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: false });
  };

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Tag Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <Box>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </Box>
  );
};

export default Tag;
