import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Post from "../../components/blog/Post";
import Layout from "../../components/Layout";
import { APP_NAME, DOMAIN } from "../../config";

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, router }) => {
  const BlogHead = () => (
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
        <Box sx={{ textAlign: "center", mt: "10%" }}>
          <Button onClick={loadMore} variant="outlined" sx={{ px: "5%" }}>
            More
          </Button>
        </Box>
      )
    );
  };

  const showAllBlogs = () => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={4}
      >
        {blogs?.map((blog, i) => {
          return (
            <Grid item xs={12} md={6} key={i} sx={{ px: 0 }}>
              <Post blog={blog} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const showAllCategories = () => {
    return (
      <Box sx={{ minWidth: 120, pt: "8%", pb: "3%" }}>
        <Box sx={{ textAlign: "center", pb: "2%" }}>
          <Box
            noWrap
            sx={{
              width: "20%",
              borderTop: "1.5px",
              borderTopStyle: "dotted",
              borderTopColor: "primary.gray",
              display: "inline-block",
              height: "5px",
            }}
          ></Box>
          <Typography component="span" variant="h6">
            CATEGORIES
          </Typography>
          <Box
            sx={{
              width: "20%",
              borderTop: "1.5px",
              borderTopStyle: "dotted",
              borderTopColor: "primary.gray",
              display: "inline-block",
              height: "5px",
            }}
          ></Box>
        </Box>
        <FormControl fullWidth size="small">
          <InputLabel>
            <Typography
              sx={{
                fontSize: ".8rem",
                fontWeight: 400,
                fontFamily: "sans-serif",
                color: "secondary.main",
              }}
            >
              Select Category
            </Typography>
          </InputLabel>
          <Select
            label="Categories"
            sx={{
              borderRadius: "5px",
              borderColor: "secondary.main",
            }}
            elevation={0}
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
      <Box sx={{ minWidth: 120, pb: "5%" }}>
        <Box sx={{ textAlign: "center", pb: "2%" }}>
          <Box
            noWrap
            sx={{
              width: "20%",
              borderTop: "1.5px",
              borderTopStyle: "dotted",
              borderTopColor: "primary.gray",
              display: "inline-block",
              height: "5px",
            }}
          ></Box>
          <Typography component="span" variant="h6">
            TAGS
          </Typography>
          <Box
            sx={{
              width: "20%",
              borderTop: "1.5px",
              borderTopStyle: "dotted",
              borderTopColor: "primary.gray",
              display: "inline-block",
              height: "5px",
            }}
          ></Box>
        </Box>
        <FormControl fullWidth size="small">
          <InputLabel>
            <Typography
              sx={{
                fontSize: ".8rem",
                fontWeight: 400,
                fontFamily: "sans-serif",
                color: "secondary.main",
              }}
            >
              Select Tag
            </Typography>
          </InputLabel>
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
    return loadedBlogs.map((blog, i) => <Post key={i} blog={blog} />);
  };

  return (
    <Fragment>
      <BlogHead />
      <Layout>
        <Box component="main" sx={{ px: 5 }}>
          <Container
            disableGutters={true}
            sx={{ display: "flex", mt: 2, mb: 2 }}
          >
            <Box component="header" sx={{ width: "100%" }}>
              {showAllCategories()}
              {showAllTags()}
            </Box>
          </Container>
          <Box>{showAllBlogs()}</Box>
          <Grid container rowSpacing={1}>
            {showLoadedBlogs()}
          </Grid>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </Box>
      </Layout>
    </Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 6;
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
