import Link from "next/link";
import React, { useState } from "react";
import { listSearch } from "../../actions/blog";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MUISearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const MUISearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MUIStyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
    anchorEl: null,
  });

  const { search, results, searched, message, anchorEl } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        anchorEl: e.currentTarget,
        message: `${data.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      anchorEl: null,
      results: [],
    });
  };

  const handleClose = () => {
    setValues({
      ...values,
      anchorEl: null,
    });
  };

  const muiSearchedBlogs = (results = []) => {
    return (
      <Box color="inherit" sx={{ width: "100%", maxWidth: 360 }}>
        <List>
          <ListItem>{message && <ListItemText primary={message} />}</ListItem>
        </List>
        <Divider />
        <nav aria-label="search results">
          <List>
            {console.log(results)}
            {results.map((blog, i) => {
              console.log(blog.slug);
              return (
                <ListItem key={i}>
                  <ListItemButton href={`/blogs/${blog.slug}`}>
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Box>
    );
  };

  const muiOverlay = (results = []) => {
    return (
      <Popover
        open={Boolean(message)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Box color="inherit" sx={{ width: "100%", maxWidth: 360 }}>
            <List>
              <ListItem>
                {message && <ListItemText primary={message} />}
              </ListItem>
            </List>
            <Divider />
            <nav aria-label="search results">
              <List>
                {console.log(results)}
                {results.map((blog, i) => {
                  console.log(blog.slug);
                  return (
                    <ListItem key={i}>
                      <ListItemButton href={`/blogs/${blog.slug}`}>
                        <ListItemText primary={blog.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </nav>
          </Box>
        </Typography>
      </Popover>
    );
  };

  const muiSearchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <MUIStyledInputBase
          placeholder="Search Articles…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </form>
    );
  };

  return (
    <MUISearch sx={{ mt: 1 / 2, mb: 1 / 2 }}>
      <MUISearchIconWrapper>
        <SearchIcon />
      </MUISearchIconWrapper>
      {muiSearchForm()}
      {searched && muiOverlay(results)}
    </MUISearch>
  );
};

export default Search;