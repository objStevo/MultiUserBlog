import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container, Grid,
  TextField,
  Typography
} from "@mui/material/";
import MuiLink from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { authenticate, isAuth, signin } from "../../actions/auth";
import LoginGoogle from "./LoginGoogle";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1f253d",
      dark: "#142a8a",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

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

  const { email, password, error, loading, message, showForm } = values;

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
        <Avatar sx={{ m: 1, bgcolor: "primary.light", color: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>
          <LoginGoogle />
          <Grid container>
            <Grid item xs>
              <Link href="/auth/password/forgot">
                <MuiLink variant="body2">{"Forgot password?"}</MuiLink>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                <MuiLink variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
