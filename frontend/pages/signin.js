import { Alert, Box, Container } from "@mui/material";
import { withRouter } from "next/router";
import SigninComponent from "../components/auth/SigninComponent";
import Layout from "../components/Layout";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <Alert severity="info">{router.query.message}</Alert>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      <Container disableGutters={true}>
        <Box sx={{ p: 1 }}>{showRedirectMessage()}</Box>
        <SigninComponent />
      </Container>
    </Layout>
  );
};

export default withRouter(Signin);
