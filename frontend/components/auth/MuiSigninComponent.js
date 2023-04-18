import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material/";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { authenticate, isAuth, signin } from "../../actions/auth";
import LoginGoogle from "./LoginGoogle";

export default function MuiSigninComponent() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        console.log("There was an error with signin api:", data.error);
        console.log("values: ", values);
        setValues({ ...values, error: data.error, loading: false });
      } else {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            m: 1,
            bgcolor: "primary.light",
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          <LockOutlinedIcon />
          <Typography variant="h6">SIGN IN</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {showLoading()}
          {showMessage()}
          {showError()}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange("email")}
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange("password")}
          />
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button type="submit" variant="contained" sx={{ width: "100%" }}>
              Sign In
            </Button>
            <LoginGoogle
              sx={{ mt: 1, width: "100%", display: "inline-block" }}
            />
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={5}>
              <Link href="/auth/password/forgot">
                <MuiLink variant="body2">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "0.8rem", textAlign: "center", pt: 1 }}
                  >
                    Forgot password
                  </Typography>
                </MuiLink>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Link href="/signup">
                <MuiLink variant="body2">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "0.8rem", textAlign: "center", pt: 1 }}
                  >
                    Signup
                  </Typography>
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
