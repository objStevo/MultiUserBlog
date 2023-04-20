import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { emailContactForm } from "../../actions/form";

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    console.log({ authorEmail, name, email, message });
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message",
    });
  };

  const showSuccessMessage = () =>
    success && <Alert severity="success">Thank you for contacting us.</Alert>;

  const showErrorMessage = () =>
    error && <Alert severity="warning">{error}</Alert>;

  return (
    <Box sx={{ pt: 3 }}>
      <form onSubmit={clickSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={4} md={10}>
            {showSuccessMessage()}
            {showErrorMessage()}
          </Grid>
          <Grid item xs={4} md={10}>
            <TextField
              id="contact-name"
              label="Name"
              variant="outlined"
              size="small"
              required
              sx={{ width: "50%" }}
              onChange={handleChange("name")}
              value={name}
            />
          </Grid>
          <Grid item xs={4} md={10}>
            <TextField
              id="contact-email"
              label="Email"
              variant="outlined"
              size="small"
              required
              fullWidth
              sx={{ width: "50%" }}
              onChange={handleChange("email")}
              value={email}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="contact-message"
              label="Message"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={6}
              onChange={handleChange("message")}
              value={message}
            />
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                "&:hover": { bgcolor: "primary.main", color: "primary.light" },
              }}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactForm;
