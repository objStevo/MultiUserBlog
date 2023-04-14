import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { lightTheme } from "./theme";

const Layout = ({ children }) => {
  let theme = createTheme(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: "12%", pt: 5 }}>
        <Header />
        <Grid container>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
          <Grid item xs={12} md={3} sx={{ border: 2 }}>
            Test
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <Footer sx={{ position: "absolute", bottom: "50px" }} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
