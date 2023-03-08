import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { Fragment, useState } from "react";
import { isAuth, signout } from "../../actions/auth";

const MobileMenu = (props) => {
  const { children, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu-mobile";

  return (
    <Box {...other}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        color="inherit"
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

export default MobileMenu;
