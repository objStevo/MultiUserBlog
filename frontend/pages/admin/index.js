import Layout from "../../components/Layout";
import Link from "next/link";
import Admin from "../../components/auth/Admin";
import { Typography, Box, Divider, Grid } from "@mui/material";

const AdminIndex = () => {
  const adminLinks = [
    { label: "Create Category", path: "/admin/crud/category-tag" },
    { label: "Create Tag", path: "/admin/crud/category-tag" },
    { label: "Create Blog", path: "/admin/crud/blog" },
    { label: "Update Blog", path: "/admin/crud/blogs" },
    { label: "Update Profile", path: "/user/update" },
  ];

  return (
    <Layout>
      <Admin>
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <Box component="span">
            <Typography
              variant="h4"
              sx={{
                mx: "auto",
                display: "inline-block",
                color: "primary.dark",
              }}
            >
              Admin
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
          <Grid container rowSpacing={1} sx={{ px: 10, pt: 2 }}>
            {adminLinks.map((link, i) => (
              <Grid item xs={6} key={i}>
                <Link href={link.path}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      display: "inline-block",
                      px: 2,
                      "&:hover": { cursor: "pointer" },
                    }}
                  >
                    {link.label.toUpperCase()}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
