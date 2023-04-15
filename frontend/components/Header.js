import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { APP_NAME, APP_SUBTOPIC, APP_TOPIC } from "../config";
import Search from "./Blog/Search";
import HeaderMenu from "./Header/HeaderMenu";
import MobileMenu from "./Header/MobileMenu";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const pages = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: `${APP_TOPIC}`, href: "/blogs" },
    { title: `${APP_SUBTOPIC}`, href: "/blogs" },
    { title: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      title: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FacebookIcon />,
    },
    { title: "Twitter", href: "https://twitter.com/", icon: <TwitterIcon /> },
    {
      title: "Instagram",
      href: "https://www.instagram.com/",
      icon: <InstagramIcon />,
    },
    {
      title: "Pinterest",
      href: "https://www.pinterest.com/",
      icon: <PinterestIcon />,
    },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <img src="/logo.png" width={"50px"} />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{
          color: "secondary.main",
        }}
      >
        <Grid md={2} item sx={{ display: { xs: "none", md: "inline-block" } }}>
          {socialLinks.map((link, i) => {
            const { href, icon } = link;
            return (
              <Box key={i} component="span" sx={{ mr: 0.5, cursor: "pointer" }}>
                <Link href={href} key={i}>
                  {icon}
                </Link>
              </Box>
            );
          })}
        </Grid>
        <Grid xs={12} md={8} item sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "primary.main",
              fontSize: { xs: "2.3rem", md: "h3.fontSize" },
            }}
          >
            {APP_NAME}
          </Typography>
        </Grid>
        <Grid md={2} item sx={{ display: { xs: "none", md: "flex" } }}>
          <Search />
        </Grid>
      </Grid>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "background.default",
          borderTop: "1.5px",
          borderTopStyle: "dotted",
          borderTopColor: "primary.gray",
          borderBottom: "1.5px",
          borderBottomStyle: "dotted",
          borderBottomColor: "primary.gray",
          color: "primary.dark",
          mb: "15px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "7%",
          }}
          variant="dense"
          disableGutters={true}
        >
          {pages?.map((page, i) => (
            <Link key={i} href={page.href}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  textAlign: "center",
                  display: { xs: "none", md: "flex" },
                  cursor: "pointer",
                }}
              >
                {page?.title?.toUpperCase()}
              </Typography>
            </Link>
          ))}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <HeaderMenu>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  textAlign: "center",
                  display: { xs: "none", md: "flex" },
                  cursor: "pointer",
                }}
              >
                ADMIN
              </Typography>
            </HeaderMenu>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: { xs: "flex", md: "none", textAlign: "center" },
            }}
          >
            <MobileMenu sx={{ width: "100%" }} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

/* <Search /> */
