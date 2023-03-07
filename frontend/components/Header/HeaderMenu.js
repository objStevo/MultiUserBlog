import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Menu, MenuItem, Box } from "@mui/material";
import { Fragment, useState } from "react";
import Link from "next/link";
import { isAuth, signout } from "../../actions/auth";

const HeaderMenu = (props) => {
  const { children, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    console.log("handle click ");
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    console.log("handle close");
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  console.log("mounted menu");

  return <h1>test</h1>;
};

export default HeaderMenu;
