import { Button, Box } from "@mui/material";
import Router from "next/router";
import GoogleLogin from "react-google-login";
import { authenticate, isAuth, loginWithGoogle } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";

const LoginGoogle = (props) => {
  const { ...other } = props;

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
    <Box {...other}>
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
            variant="outlined"
            sx={{
              mb: 2,
            }}
          >
            Sign In with Google
          </Button>
        )}
      />
    </Box>
  );
};

export default LoginGoogle;
