import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import MuiSigninComponent from "../components/auth/MuiSigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        <div className="row">
          <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            {/* <SigninComponent /> */}
            <MuiSigninComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
