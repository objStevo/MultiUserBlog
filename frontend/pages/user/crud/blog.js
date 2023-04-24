import Private from "../../../components/auth/Private";
import MuiBlogCreate from "../../../components/crud/MuiBlogCreate";
import Layout from "../../../components/Layout";
import { Typography, Box, Divider } from "@mui/material";

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <Box sx={{ textAlign: "center", pt: { xs: 1, md: 2, lg: 3 } }}>
          <Box component="span">
            <Typography
              variant="h4"
              sx={{
                mx: "auto",
                display: "inline-block",
                color: "primary.dark",
              }}
            >
              Write
            </Typography>
            <Divider
              sx={{
                mx: "47%",
                borderBottom: "1.5px",
                borderBottomStyle: "dotted",
                borderBottomColor: "primary.gray",
              }}
            />
          </Box>
        </Box>
        <MuiBlogCreate />
      </Private>
    </Layout>
  );
};

export default CreateBlog;
