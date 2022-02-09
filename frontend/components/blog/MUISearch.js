import Link from "next/link";
import React, { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";

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
    marginLeft: theme.spacing(1),
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
  color: "white",
  ".Mui-focused": {
    border: "10px",
    borderColor: "red",
  },
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

const MUIStyledPopover = styled(Popover)(({ theme }) => ({
  color: "red",
  ".MuiTypography-root": {
    fontSize: "0.9rem",
  },
  "& .MuiPopover-paper": {
    padding: 0,
    width: "74%",
    [theme.breakpoints.between("sm", "md")]: {
      width: "22.5ch",
    },
    [theme.breakpoints.up("md")]: {
      width: "23.5ch",
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
      <MUIStyledPopover
        open={searched}
        anchorEl={anchorEl}
        onClose={handleOverlayClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: { bgcolor: "#3b3b44", color: "white" },
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
      </MUIStyledPopover>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <MUIStyledInputBase
          placeholder="Search Articles…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleFormChange}
          focused={{ borderColor: "primary.main" }}
        />
      </form>
    );
  };

  return (
    <MUISearch>
      <MUISearchIconWrapper>
        <SearchIcon sx={{ color: "white" }} />
      </MUISearchIconWrapper>
      {searchForm()}
      {searchResults(results)}
    </MUISearch>
  );
};

export default Search;
