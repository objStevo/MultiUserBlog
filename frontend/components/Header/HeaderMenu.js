import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { isAuth, signout } from "../../actions/auth";

const HeaderMenu = (props) => {
  const { children, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  return (
    <Box {...other}>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        color="inherit"
        sx={{ pt: 1 / 2, pb: 1 / 2 }}
      >
        {children}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        PaperProps={{
          sx: { bgcolor: "#3b3b44", color: "primary.main" },
        }}
      >
        {isAuth() && isAuth().role === 0 && (
          <Link href="/user">
            <MenuItem>
              <DashboardIcon sx={{ mr: 2, width: 1 / 5 }} />
              Dashboard
            </MenuItem>
          </Link>
        )}
        {isAuth() && isAuth().role === 1 && (
          <Link href="/admin">
            <MenuItem>
              <DashboardIcon sx={{ mr: 2, width: 1 / 5 }} />
              Dashboard
            </MenuItem>
          </Link>
        )}
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
          <Box>
            <Divider />
            <Link href="/signin">
              <MenuItem>
                <LoginIcon sx={{ mr: 2, width: 1 / 5 }} />
                Log In
              </MenuItem>
            </Link>
          </Box>
        )}
        {isAuth() && (
          <Box>
            <Divider />
            <Link href="/signin">
              <MenuItem
                onClick={() => signout(() => Router.replace(`/signin`))}
              >
                <LogoutIcon sx={{ mr: 2, width: 1 / 5 }} />
                Log Out
              </MenuItem>
            </Link>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default HeaderMenu;
