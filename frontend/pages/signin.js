import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Signin = () => {
  return (
    <StyledContainer>
      <Layout>
        <SigninComponent />
      </Layout>
    </StyledContainer>
  );
};

export default Signin;
