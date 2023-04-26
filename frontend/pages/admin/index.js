import Layout from "../../components/Layout";
import Link from "next/link";
import Admin from "../../components/auth/Admin";
import { Typography, Box, Divider, Grid } from "@mui/material";

const AdminIndex = () => {
  const adminLinks = [
    { label: "Create Category", path: "/admin/crud/category-tag" },
    { label: "Create Tag", path: "/admin/crud/category-tag" },
    { label: "Create Blog", path: "/admin/crud/blog" },
    { label: "Update/Delete Blog", path: "/admin/crud/blogs" },
    { label: "Update/Delete Category", path: "/admin/crud/category-tag" },
    { label: "Update/Delete Tag", path: "/admin/crud/category-tag" },
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
          <Grid container>
            {adminLinks.map((link, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Link href={link.path}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "flex" },
                      px: 2,
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

{
  /* <div className="container-fluid">
<div className="row">
  <div className="col-md-12 pt-5 pb-5">
    <h2>Admin Dashboard</h2>
  </div>
  <div className="col-md-4">
    <ul className="list-group">
      <li className="list-group-item">
        <Link href="/admin/crud/category-tag">
          <a>Create Category</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/category-tag">
          <a>Create Tag</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/blog">
          <a>Create Blog</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/blogs">
          <a>Update/Delete Blog</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/user/update">
          <a>Update Profile</a>
        </Link>
      </li>
    </ul>
  </div>
  <div className="col-md-4">
    <ul className="list-group">
      <li className="list-group-item">Right</li>
    </ul>
  </div>
</div>
</div> */
}
