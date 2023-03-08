import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import { Fragment, useState } from "react";
import { isAuth, signout } from "../actions/auth";
import { APP_NAME } from "../config";
import Search from "./blog/MUISearch";
import HeaderMenu from "./Header/HeaderMenu";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href="/user/crud/blog">
        <MenuItem>
          <CreateIcon sx={{ mr: 2, width: 1 / 5 }} />
          Write
        </MenuItem>
      </Link>
      <Link href="/blogs">
        <MenuItem>
          <ArticleIcon sx={{ mr: 2, width: 1 / 5 }} />
          Blogs
        </MenuItem>
      </Link>
      <Link href="/contact">
        <MenuItem>
          <ContactMailIcon sx={{ mr: 2, width: 1 / 5 }} />
          Contact
        </MenuItem>
      </Link>
      {!isAuth() && (
        <Fragment>
          <Divider />
          <Link href="/signin">
            <MenuItem>
              <LoginIcon sx={{ mr: 2, width: 1 / 5 }} />
              Log In
            </MenuItem>
          </Link>
        </Fragment>
      )}
      {isAuth() && (
        <Fragment>
          <Divider />
          <Link href="/signin">
            <MenuItem onClick={() => signout(() => Router.replace(`/signin`))}>
              <LogoutIcon sx={{ mr: 2, width: 1 / 5 }} />
              Log Out
            </MenuItem>
          </Link>
        </Fragment>
      )}
    </Menu>
  );

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
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
    </Box>
  );
};

export default Header;
