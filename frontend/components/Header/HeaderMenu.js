import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
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
          <Link href="/user">
            <MenuItem>Dashboard</MenuItem>
          </Link>
        )}
        {isAuth() && isAuth().role === 1 && (
          <Link href="/admin">
            <MenuItem>Dashboard</MenuItem>
          </Link>
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
        <MenuItem>
          <Link href="/contact">
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
              {"Contact".toUpperCase()}
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
                  {"Log In".toUpperCase()}
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
            <Link href="/signin">
              <MenuItem
                onClick={() => signout(() => Router.replace(`/signin`))}
              >
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
