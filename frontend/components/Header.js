import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Box,
  Button, IconButton, Toolbar,
  Typography
} from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import { Fragment } from "react";
import { isAuth } from "../actions/auth";
import { APP_NAME } from "../config";
import Search from "./blog/MUISearch";
import HeaderMenu from "./Header/HeaderMenu";
import MobileMenu from "./Header/MobileMenu";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#26262c",
          color: "white",
        }}
      >
        <Toolbar variant="dense">
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="Desk"
              sx={{ mr: 0, color: "#FA58B6" }}
            >
              <DesktopWindowsIcon />

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: 2, display: { xs: "none", md: "flex" } }}
              >
                {APP_NAME}
              </Typography>
            </IconButton>
          </Link>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ pt: 1 / 2, pb: 1 / 2 }}
            >
              <Link href="/user/crud/blog">
                <CreateIcon />
              </Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ pt: 1 / 2, pb: 1 / 2 }}
            >
              <Link href="/blogs">
                <ArticleIcon />
              </Link>
            </IconButton>
            {!isAuth() && (
              <Fragment>
                <Button
                  sx={{ pt: 1 / 2, pb: 1 / 2, mr: 1, bgcolor: "#53535f" }}
                  size="small"
                  variant="contained"
                >
                  <Link href="/signin">
                    <Typography variant="string">Log In</Typography>
                  </Link>
                </Button>
                <Button
                  sx={{ pt: 1 / 2, pb: 1 / 2, bgcolor: "#FA58B6" }}
                  color="inherit"
                  size="small"
                  variant="contained"
                >
                  <Link href="/signup">
                    <Typography variant="string">Sign Up</Typography>
                  </Link>
                </Button>
              </Fragment>
            )}

            <HeaderMenu>
              <AccountCircle />
            </HeaderMenu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MobileMenu>
              <MoreIcon />
            </MobileMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
