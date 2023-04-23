import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { lightTheme } from "./theme";

const Layout = ({ children }) => {
  let theme = createTheme(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: { xs: 8, sm: 12, md: 16, lg: 20, xl: 30 } }}>
        <Box>
          <Header />
        </Box>
        <Box
          sx={{
            minHeight: {
              xs: "40vh",
              sm: "50vh",
              md: "60vh",
              lg: "70vh",
              xl: "75vh",
            }
          }}
        >
          {children}
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
