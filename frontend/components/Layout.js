import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";

const Layout = ({ children }) => {
  let theme = createTheme(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
