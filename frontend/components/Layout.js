import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { lightTheme } from "./theme";

const Layout = ({ children }) => {
  let theme = createTheme(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: "12%", pt: 5 }}>
        <Header sx={{ my: "15px" }} />
        <Grid container>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
          <Grid item xs={12} md={3} sx={{ border: 2 }}>
            Test
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
