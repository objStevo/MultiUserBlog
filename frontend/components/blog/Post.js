import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import parse from "html-react-parser";
import Card from "@mui/material/Card"; 
import { CardActionArea, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { API } from "../../config";
import Link from "next/link"; 

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Post = (props) => {
  const { blog } = props;

  return (
    <Grid item xs={12}>
      <Link href={`/blogs/${blog.slug}`}>
        <CardActionArea>
          <Card variant="" sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h5" variant="h5">
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
                  {blog.tags.map((tag, i) => (
                    <Grid item xs="auto">
                      <Item>{tag.name}</Item>
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

export default Post;