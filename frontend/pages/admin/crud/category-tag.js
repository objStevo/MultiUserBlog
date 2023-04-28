import { Container, Grid } from "@mui/material";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Layout from "../../../components/Layout";
import Title from "../../../components/Title";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <Title title={"Create Tags & Categories"} />
        <Container>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Category />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tag />
            </Grid>
          </Grid>
        </Container>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
