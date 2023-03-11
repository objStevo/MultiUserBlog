import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Paper,
  Typography,
} from "@mui/material";
import { maxWidth } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";
import { listSearch } from "../../actions/blog";

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
    const searchEl = e.target;
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        anchorEl: searchEl,
        message: data.length === 0 ? `${data.length} blogs found` : "",
      });
    });
  };

  const handleFormChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      results: [],
    });
  };

  const handleOverlayClose = (e) => {
    setValues({
      ...values,
      searched: false,
      anchorEl: null,
    });
  };

  const searchResults = () => {
    return (
      <Menu
        open={searched}
        anchorEl={anchorEl}
        onClose={handleOverlayClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ maxWidth: "250px" }}
      >
        <Box color="inherit" sx={{ fontSize: ".4rem" }}>
          {message && (
            <List>
              <ListItem>
                <ListItemText primary={message} />
              </ListItem>
            </List>
          )}
          {!message && (
            <nav aria-label="search results">
              <List>
                {results.map((blog, i) => {
                  return (
                    <Box key={i}>
                      <ListItem>
                        <ListItemButton sx={{ p: 0 }}>
                          <Link href={`/blogs/${blog.slug}`}>
                            <Typography
                              variant="h6"
                              noWrap
                              component="div"
                              sx={{
                                textAlign: "center",
                                display: { xs: "none", md: "flex" },
                                cursor: "pointer",
                              }}
                            >
                              {blog?.title?.toUpperCase()}
                            </Typography>
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </nav>
          )}
        </Box>
      </Menu>
    );
  };

  return (
    <form
      onSubmit={(event) => {
        return searchSubmit(event);
      }}
      style={{ width: "100%" }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          display: "flex",
          px: 1,
          mb: 0.5,
          float: "right",
        }}
      >
        <IconButton
          onClick={(event) => {
            searchSubmit(event);
          }}
          sx={{ p: 0, color: "secondary.main" }}
          aria-label="menu"
        >
          <SearchIcon sx={{ fontSize: "20px", pr: 1 }} />
        </IconButton>
        <InputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          onChange={handleFormChange}
          sx={{
            borderRadius: "5px",
            fontSize: ".8rem",
            fontWeight: 300,
            fontFamily: "sans-serif",
          }}
          value={search}
          autoFocus
        />
        {searchResults()}
      </Paper>
    </form>
  );
};

export default Search;
