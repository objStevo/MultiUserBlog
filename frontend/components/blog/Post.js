import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import parse from "html-react-parser";
import moment from "moment";
import { API } from "../../config";

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
    <Card sx={{ py: "10%", px: 0 }} elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "370px",
            display: { xs: "none", sm: "block" },
            borderRadius: "5px",
          }}
          src={`${API}/api/blog/photo/${blog.slug}`}
          alt={blog.title}
        />
        <CardContent sx={{ height: "200px", pt: 2, px: 0 }}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="h6" color="secondary.gray">
            {`By ${blog.postedBy.username} · ${moment(
              blog.updatedAt
            ).fromNow()}`}
          </Typography>
          <Typography variant="h6" paragraph>
            {parse(blog.excerpt)}
          </Typography>
          {(blog.categories.length || blog.tags.length) && (
            <Grid container spacing={1}>
              {blog.categories.map((category, i) => (
                <Grid item xs="auto">
                  <Typography sx={{ fontSize: ".5rem", color: "red" }}>
                    <Item>{category.name}</Item>
                  </Typography>
                </Grid>
              ))}
              {blog.tags.map((tag, i) => (
                <Grid item xs="auto">
                  <Typography sx={{ bgcolor: "red" }}>
                    <Item>{tag.name}</Item>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
