import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";
import React from "react";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setValues({ ...values, categories: data.data});
      }
    });
  };

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        // Event handlers take callback functions (not invoked), as the parameter, but if need to pass arguments, then we use arrow function
        <buttton title="Double click to delete" onDoubleClick={() => deleteConfirm(c.slug)} key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {c.name}
        </buttton>
      );
    });
  };

  const deleteConfirm = slug => {
    console.log('The slug is ', slug);
    let answer = window.confirm('Are you sure you want to delete this category')
    if(answer){
      deleteCategory(slug);
    }
  };

  const deleteCategory = slug => {
    console.log('delete', slug);
    removeCategory(slug,token).then(data => {
      if(data.error){
        console.error(data.error);
      } else {
        setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
      }
    })
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
          success: false,
          name: "",
          removed: !removed,
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
      removed: "",
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
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
    <React.Fragment>
      {newCategoryForm()}
      <div>{showCategories()}</div>
    </React.Fragment>
  );
};

export default Category;
