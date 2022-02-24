import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CardActionArea, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import parse from "html-react-parser";
import Card from "@mui/material/Card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}));

const ShowPosts = (props) => {
  const { blog } = props;

  const showPostCategories = (categories) =>
    categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showPostTags = (tags) =>
    tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  console.log(props);
  return (
    <Grid item xs={12}>
      <Link href={`/blogs/${blog.slug}`}>
        <CardActionArea component="a">
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {blog.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {`By ${blog.postedBy.username} · ${moment(
                  blog.updatedAt
                ).fromNow()}`}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {parse(blog.excerpt)}
              </Typography>
              {(blog.categories.length || blog.tags.length) && (
                <Grid container spacing={1}>
                  {blog.categories.map((category, i) => (
                    <Grid item xs="auto">
                      <Item>{category.name}</Item>
                    </Grid>
                  ))}
                  {blog.tags.map((taga, i) => (
                    <Grid item xs="auto">
                      <Item>{taga.name}</Item>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
};

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web developoment tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        ccontent={`${DOMAIN}/static/images/nature.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          {/* <Card blog={blog} /> */}
          <ShowPosts blog={blog} />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return (
      <Box sx={{ minWidth: 120, mr: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categories"
          >
            {categories.map((c, i) => (
              <Link href={`/categories/${c.slug}`}>
                <MenuItem>{c.name}</MenuItem>
              </Link>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const showAllTags = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categories"
          >
            {tags.map((t, i) => (
              <Link href={`/tags/${t.slug}`}>
                <MenuItem>{t.name}</MenuItem>
              </Link>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <ShowPosts blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                {showAllCategories()}
                {showAllTags()}
              </Box>
            </header>
            <Divider />
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
