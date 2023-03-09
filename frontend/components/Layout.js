import { createTheme, ThemeProvider, Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { lightTheme } from "./theme";

const Layout = ({ children }) => {
  let theme = createTheme(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: "12%", pt: 5 }}>
        <Header />
        {children}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
