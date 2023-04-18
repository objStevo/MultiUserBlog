import { Alert, Box, Container } from "@mui/material";
import { withRouter } from "next/router";
import MuiSigninComponent from "../components/auth/MuiSigninComponent";
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
        <MuiSigninComponent />
      </Container>
    </Layout>
  );
};

export default withRouter(Signin);
