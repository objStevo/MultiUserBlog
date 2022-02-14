import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import Button from "@mui/material/Button";

const LoginGoogle = () => {
  const handleGooglesError = (err) => {
    console.log("Google error");
    console.error(err);
  };
  const responseGoogle = (response) => {
    console.log(response);
    const tokenId = response.tokenId;
    const user = { tokenId };

    loginWithGoogle(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Sign In with Google"
        onSuccess={responseGoogle}
        onFailure={handleGooglesError}
        theme="dark"
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mb: 2, bgcolor:"white", color: "#1f253d" }}
          >
            Sign In with Google
          </Button>
        )}
      />
    </div>
  );
};

export default LoginGoogle;
