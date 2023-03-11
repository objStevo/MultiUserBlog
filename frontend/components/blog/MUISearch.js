import ArticleIcon from "@mui/icons-material/Article";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
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
    const searchEl = e.currentTarget;
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

  const searchResults = (results = []) => {
    return (
      <Popover
        open={searched}
        anchorEl={anchorEl}
        onClose={handleOverlayClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ fontSize: ".4rem" }}>
          <Box color="inherit">
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
                      <React.Fragment>
                        <ListItem key={i}>
                          <ListItemButton sx={{ p: 0 }}>
                            <ArticleIcon sx={{ mr: 1 }} />
                            <Link href={`/blogs/${blog.slug}`}>
                              <ListItemText
                                primary={blog.title}
                                sx={{ fontSize: ".4rem" }}
                              />
                            </Link>
                          </ListItemButton>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
                </List>
              </nav>
            )}
          </Box>
        </Typography>
      </Popover>
    );
  };

  const SearchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <InputBase
          placeholder="Search Articles…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleFormChange}
          focused={{ borderColor: "primary.main" }}
        />
      </form>
    );
  };

  return (
    <Box>
      <Box>
        <SearchIcon />
      </Box>
      <SearchForm />
      {searchResults(results)}
    </Box>
  );
};

export default Search;
