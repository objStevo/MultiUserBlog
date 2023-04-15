import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

const Footer = (props) => {
  const { ...other } = props;
  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Contact", href: "/contact" },
  ];
  return (
    <Box
      sx={{
        borderTop: "1.5px",
        borderTopStyle: "dotted",
        borderTopColor: "primary.gray",
        borderBottom: "1.5px",
        borderBottomStyle: "dotted",
        borderBottomColor: "primary.gray",
        mx: "12%",
        my: "15px",
        py: 2,
        color: "primary.dark",
      }}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {footerLinks.map((link, i) => {
          return (
            <Grid item xs={1} key={i}>
              <Link href={"again.com"}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    textAlign: "center",
                    display: { xs: "none", md: "flex" },
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
    </Box>
  );
};

export default Footer;
