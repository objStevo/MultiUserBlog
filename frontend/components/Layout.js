import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MUIHeader from "./MUIHeader"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <MUIHeader/>
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
