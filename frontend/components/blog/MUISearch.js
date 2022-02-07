import Link from "next/link";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  const muiSearchForm = () => {
    <form onSubmit={searchSubmit}>
          <MUIStyledInputBase
            placeholder="Search Articles…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
    </form>;
  };

  //   return (
  //     <div className="container-fluid">
  //       <div className="pt-3 pb-5">{searchForm()}</div>
  //       {searched && (
  //         <div style={{ marginTop: "-120px", marginBottom: "-80px" }}>
  //           {searchedBlogs(results)}
  //         </div>
  //       )}
  //     </div>
  //   );
  return (
    <MUISearch sx={{ mt: 1 / 2, mb: 1 / 2 }}>
      <MUISearchIconWrapper>
        <SearchIcon />
      </MUISearchIconWrapper>
      {muiSearchForm()}
    </MUISearch>
  );
};

export default Search;
