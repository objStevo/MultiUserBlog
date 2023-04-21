import Layout from "../components/Layout";
import Link from "next/link";
import ContactForm from "../components/form/ContactForm";
import { Typography, Box, Divider } from "@mui/material";

const Contact = () => {
  return (
    <Layout>
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
            Contact Me
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
      <ContactForm />
    </Layout>
  );
};

export default Contact;
