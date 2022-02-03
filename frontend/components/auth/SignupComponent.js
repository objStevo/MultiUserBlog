import React from "react";
import styled from "styled-components";
import { signup, isAuth, preSignup } from "../../actions/auth";
import Router from "next/router";
import { useState, useEffect } from "react";

const StyledContainer = styled.div`
  background-color: #f9f6f2;
  padding: 27vh 0 27vh 0;
  & h4 {
    color: #3A2E39;
    margin-top:0.5rem;
  }
  & .icon-row {
    padding-bottom 5%;
  }
`;

const StyledButton = styled.button`
  background-color: #57886c;
  font-weight: 500;
  border-color: #57886c;
  :hover {
    color: #57886c;
    background-color: white;
    border-color: #57886c;
  }
`;
const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "Ryan",
    email: "ryan@gmail.com",
    password: "rrrrrr",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading,message, showForm});
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    // When we are ready to handle the email functionality, we change this to preSignup(user).then((data)=>{...
    preSignup(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    loading ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    loading ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <StyledContainer>
        <div className="container">
          <div className="row justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-start icon-row">
                <div className="col-1">
                  {" "}
                  <img src="./userp32.png" alt="account image"></img>
                </div>
                <div className="col-6">
                  <h4>Create Account</h4>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <input
                    value={name}
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <input
                    value={name}
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  value={email}
                  onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  placeholder="Type your email"
                />
              </div>

              <div className="form-group">
                <input
                  value={password}
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  placeholder="Type your password"
                />
              </div>

              <div>
                <StyledButton className="btn btn-primary btn-block">
                  Signup
                </StyledButton>
              </div>
            </form>
          </div>
        </div>
      </StyledContainer>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
