import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { authenticate, isAuth, signin } from "../../actions/auth";
import Router from "next/router";
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

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
const SigninComponent = () => {
  const [values, setValues] = useState({
    name: "Ryan",
    email: "ryan@gmail.com",
    password: "rrrrrr",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  /*If you only want to invoke the effect after the initial render pass it an empty array as second argument*/
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents a reload of the page
    // console.table({ name, email, password, error, loading,message, showForm});
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // Save user token to cookie
        // Save user info to localStorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    //Below brackets is ES2015 computed property name that gives the property the name of the string value in the parameter
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <StyledContainer>
        <div>{email}</div>
        <div className="container">
          <div className="row justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-start icon-row">
                <div className="col-1">
                  {" "}
                  <img src="./userp32.png" alt="account image"></img>
                </div>
                <div className="col-6">
                  <h4>Login</h4>
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
                  Signin
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
      <LoginGoogle />
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger btn-sm">Forgot password</a>
      </Link>
    </React.Fragment>
  );
};

export default SigninComponent;
