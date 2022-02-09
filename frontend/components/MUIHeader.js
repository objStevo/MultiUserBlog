import { APP_NAME } from "../config";
import Router from "next/router";
import React from "react";
import { isAuth, signout } from "../actions/auth";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Search from "./blog/MUISearch";
import Divider from "@mui/material/Divider";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import Typography from "@mui/material/Typography";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    console.log("Handle mobile menu close");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    console.log("Handle Menu Close");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    console.log("handle mobile menu open");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuth() && isAuth().role === 0 && (
        <MenuItem onClick={handleMenuClose}>
          <Link href="/user">My Dashboard</Link>
        </MenuItem>
      )}
      {isAuth() && isAuth().role === 1 && (
        <MenuItem onClick={handleMenuClose}>
          <Link href="/admin">Admin Dashboard</Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Link href="/blogs">Blogs</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="contact">Contact</Link>
      </MenuItem>
      {!isAuth() && (
        <React.Fragment>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Link href="/signin">Log In</Link>
          </MenuItem>
        </React.Fragment>
      )}
      {isAuth() && (
        <React.Fragment>
          <Divider />
          <MenuItem onClick={() => signout(() => Router.replace(`/signin`))}>
            <Link href="/signup">Signout</Link>
          </MenuItem>
        </React.Fragment>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
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
      {!isAuth && <p>Blogs</p>}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificationsss</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
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
          <IconButton
            size="large"
            edge="start"
            aria-label="Desk"
            sx={{ mr: 0, color: "#FA58B6" }}
          >
            <Link href="/">
              <DesktopWindowsIcon />
            </Link>
          </IconButton>
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
              <React.Fragment>
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
                    <Typography variant="string" >Sign Up</Typography>
                  </Link>
                </Button>
              </React.Fragment>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ pt: 1 / 2, pb: 1 / 2 }}
            >
              <AccountCircle />
            </IconButton>
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
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

// --color-hinted-grey-1: #0e0e10;
// --color-hinted-grey-2: #18181b;
// --color-hinted-grey-3: #1f1f23;
// --color-hinted-grey-4: #26262c;
// --color-hinted-grey-5: #323239;
// --color-hinted-grey-6: #3b3b44;
// --color-hinted-grey-7: #53535f;
// --color-hinted-grey-8: #848494;
// --color-hinted-grey-9: #adadb8;
