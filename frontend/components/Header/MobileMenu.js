import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useState } from "react";
import { isAuth, signout } from "../../actions/auth";
import Router from "next/router";

const MobileMenu = (props) => {
  const { children, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const menuId = "primary-search-account-menu-mobile";
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box {...other}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(!anchorEl);
        }}
        color="inherit"
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Collapse in={isMenuOpen}>
        <Box
          sx={{ width: "100%", display: `${isMenuOpen ? "block" : "none"}` }}
        >
          <Link href="/user/crud/blog">
            <MenuItem>
              <CreateIcon
                sx={{ mr: 2, color: "secondary.main", fontSize: "1.1rem" }}
              />
              Write
            </MenuItem>
          </Link>
          <Divider />
          <Link href="/blogs">
            <MenuItem>
              <ArticleIcon
                sx={{ mr: 2, color: "secondary.main", fontSize: "1.1rem" }}
              />
              Blogs
            </MenuItem>
          </Link>
          <Divider />
          <Link href="/contact">
            <MenuItem>
              <ContactMailIcon
                sx={{ mr: 2, color: "secondary.main", fontSize: "1.1rem" }}
              />
              Contact
            </MenuItem>
          </Link>
          <Divider />
          {!isAuth() && (
            <Link href="/signin">
              <MenuItem sx={{ mb: 1 }}>
                <LoginIcon
                  sx={{ mr: 2, color: "secondary.main", fontSize: "1.1rem" }}
                />
                Log In
              </MenuItem>
            </Link>
          )}
          {isAuth() && (
            <Link href="/signin">
              <MenuItem
                onClick={() => signout(() => Router.replace(`/signin`))}
              >
                <LogoutIcon
                  sx={{ mr: 2, color: "secondary.main", fontSize: "1.1rem" }}
                />
                Log Out
              </MenuItem>
            </Link>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default MobileMenu;
