import Link from "next/link";
import React, { useState } from "react";
import { listSearch } from "../../actions/blog";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, Divider, ListItemButton } from "@mui/material/Box";

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
    // vertical padding + font size from searchIcon
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
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}

        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const muiSearchedBlogs = (results = []) => {
    return (
      <React.Fragment>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <List>
            <ListItem>{message && (<ListItemText primary={message} />)}</ListItem>
          </List>
          <Divider />
          <nav aria-label="search results">
            <List>
              {results.map((blog, i) => {
                <ListItem>
                  <ListItemButton href={`/blogs/${blog.slug}`}>
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>;
              })}
            </List>
          </nav>
        </Box>
      </React.Fragment>
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
      {searched && muiSearchedBlogs(results)}
      {/* {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div>} */}
    </MUISearch>
  );
};

export default Search;


