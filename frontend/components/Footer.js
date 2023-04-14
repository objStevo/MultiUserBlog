import { Box, Grid } from "@mui/material";
import React from "react";

const Footer = (props) => {
  const { ...other } = props;
  return (
    <Box {...other}>
      {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          Test
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          Test
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          Test
        </Grid>
      </Grid> */}
      <Box>Test</Box>
      <Box>Test</Box>
      <Box>Test</Box>
    </Box>
  );
};

export default Footer;
