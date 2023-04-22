import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  TextField,
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { isAuth, preSignup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
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
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    preSignup(user).then((data) => {
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

  const showLoading = () => {
    if (loading) {
      return (
        <Alert fullWidth severity="info">
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <Alert fullWidth severity="error">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      );
    }
  };

  const showMessage = () => {
    if (message) {
      return (
        <Alert fullWidth severity="warning">
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          m: 1,
          bgcolor: "primary.light",
          color: "secondary.main",
          textAlign: "center",
        }}
      >
        <LockOutlinedIcon />
        <Typography variant="h6">SIGN UP</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {showLoading()}
        {showMessage()}
        {showError()}
        <Grid container justifyContent="space-between" rowSpacing={2}>
          <Grid item xs={12} sm={6} sx={{ pr: 1 }}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              id="firstName"
              label="First Name"
              autoFocus
              onChange={handleChange("name")}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pl: 1 }}>
            <TextField
              required
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange("password")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Link href="/signin" variant="body2" sx={{ textAlign: "center" }}>
              <MuiLink variant="body2">
                {"Already have an account? Sign in"}
              </MuiLink>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignupComponent;
