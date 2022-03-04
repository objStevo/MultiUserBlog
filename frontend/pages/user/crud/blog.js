import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";
import MuiBlogCreate from "../../../components/crud/MuiBlogCreate";
import Link from "next/link";

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <MuiBlogCreate />
      </Private>
    </Layout>
  );
};

export default CreateBlog;
