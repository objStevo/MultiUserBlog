import { Box, Divider, Typography } from "@mui/material";

const Title = (props) => {
  const { title, ...other } = props;

  return (
    <Box sx={{ textAlign: "center", mt: "4%" }} {...other}>
      <Box component="span">
        <Typography
          variant="h4"
          sx={{
            display: "inline-block",
            color: "primary.dark",
          }}
        >
          {title && title}
        </Typography>
        <Divider
          sx={{
            mx: "45%",
            borderBottom: "1.5px",
            borderBottomStyle: "dotted",
            borderBottomColor: "primary.gray",
          }}
        />
      </Box>
    </Box>
  );
};

export default Title;
