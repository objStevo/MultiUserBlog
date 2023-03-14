import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  Box,
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
            borderRadius: "5px",
          }}
          src={`${API}/api/blog/photo/${blog.slug}`}
          alt={blog.title}
        />
        <CardContent sx={{ pt: 2, px: 0 }}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="h6" color="secondary.gray">
            {`By ${blog.postedBy.username} · ${moment(
              blog.updatedAt
            ).fromNow()}`}
          </Typography>
          <Typography sx={{ minHeight: "150px" }} variant="h6" paragraph>
            {parse(blog.excerpt)}
          </Typography>
          <Box>
            {(blog.categories.length || blog.tags.length) && (
              <Grid container spacing={1}>
                {blog.categories.map((category, i) => (
                  <Grid item xs="auto">
                    <Item>
                      <Typography
                        sx={{
                          fontSize: ".7rem",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Item>
                  </Grid>
                ))}
                {blog.tags.map((tag, i) => (
                  <Grid item xs="auto">
                    <Item>
                      <Typography sx={{ fontSize: ".7rem" }}>
                        {tag.name}
                      </Typography>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
