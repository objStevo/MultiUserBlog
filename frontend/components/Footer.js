import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = (props) => {
  const { ...other } = props;
  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacypolicy" },
  ];
  return (
    <Box
      sx={{
        mt: "15px",
        color: "primary.dark",
      }}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          borderTop: "1.5px",
          borderTopStyle: "dotted",
          borderTopColor: "primary.gray",
          borderBottom: "1.5px",
          borderBottomStyle: "dotted",
          borderBottomColor: "primary.gray",
          py: 2,
        }}
      >
        {footerLinks.map((link, i) => {
          return (
            <Grid item xs={3} md={2} lg={1} key={i}>
              <Link href={link?.href}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {link?.title}
                </Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontSize: "0.7rem", textAlign: "center", pt: 1 }}
      >
        COPYRIGHT © 2023
      </Typography>
    </Box>
  );
};

export default Footer;
