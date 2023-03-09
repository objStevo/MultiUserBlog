import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { APP_SUBTOPIC, APP_TOPIC } from "../config";
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
  return (
    <Box>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "background.default",
          color: "primary.main",
          borderTop: "1.5px",
          borderTopStyle: "dotted",
          borderTopColor: "primary.gray",
          borderBottom: "1.5px",
          borderBottomStyle: "dotted",
          borderBottomColor: "primary.gray",
          color: "primary.dark",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "7%",
          }}
          variant="dense"
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
                }}
              >
                ADMIN
              </Typography>
            </HeaderMenu>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none", textAlign: "center" } }}
          >
            <MobileMenu>
              <MenuIcon />
            </MobileMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

/* <Search /> */
