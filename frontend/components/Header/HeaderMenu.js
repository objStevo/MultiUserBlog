import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { isAuth, signout } from "../../actions/auth";
import Router from "next/router";

const HeaderMenu = (props) => {
  const { children, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  return (
    <Box {...other}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        onMouseOver={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        color="inherit"
      >
        {children}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={isMenuOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            color: "primary.dark",
            borderRadius: 0,
            border: 1,
            borderColor: "primary.gray",
            mt: "1.5px",
          },
          variant: "outlined",
        }}
      >
        {isAuth() && isAuth().role === 0 && (
          <MenuItem>
            <Link href="/user">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  textAlign: "center",
                  display: { xs: "none", md: "flex" },
                  px: 2,
                }}
              >
                {"Dashboard".toUpperCase()}
              </Typography>
            </Link>
          </MenuItem>
        )}
        {isAuth() && isAuth().role === 1 && (
          <MenuItem>
            <Link href="/admin">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  textAlign: "center",
                  display: { xs: "none", md: "flex" },
                  px: 2,
                }}
              >
                {"Dashboard".toUpperCase()}
              </Typography>
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link href="/blogs">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                textAlign: "center",
                display: { xs: "none", md: "flex" },
                px: 2,
              }}
            >
              {"Blogs".toUpperCase()}
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/user/crud/blog">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                textAlign: "center",
                display: { xs: "none", md: "flex" },
                px: 2,
              }}
            >
              {"Write".toUpperCase()}
            </Typography>
          </Link>
        </MenuItem>
        {!isAuth() && (
          <Box>
            <Divider />
            <MenuItem>
              <Link href="/signin">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    textAlign: "center",
                    display: { xs: "none", md: "flex" },
                    px: 2,
                  }}
                >
                  {"Sign In".toUpperCase()}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/signup">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    textAlign: "center",
                    display: { xs: "none", md: "flex" },
                    px: 2,
                  }}
                >
                  {"Sign Up".toUpperCase()}
                </Typography>
              </Link>
            </MenuItem>
          </Box>
        )}
        {isAuth() && (
          <Box>
            <Divider />
            <MenuItem>
              <Link href="/signin">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    textAlign: "center",
                    display: { xs: "none", md: "flex" },
                    px: 2,
                  }}
                >
                  {"Sign Out".toUpperCase()}
                </Typography>
              </Link>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default HeaderMenu;
