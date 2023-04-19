import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";
import React from "react";
import { Grid, FormControl, FormLabel, TextField, Box } from "@mui/material";

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
    success && (
      <div className="alert alert-info">Thank you for contacting us.</div>
    );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const contact = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            required
          />
        </div>

        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  const contactForm = (props) => {
    const { ...other } = props;

    return (
      <form onSubmit={clickSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={10}>
            <TextField
              id="contact-name"
              label="Name"
              variant="outlined"
              size="small"
              required
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={4} md={10}>
            <TextField
              id="contact-email"
              label="email"
              variant="outlined"
              size="small"
              required
              fullWidth
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="contact-message"
              label="Message"
              variant="outlined"
              size="small"
              required
              fullWidth
              multiline
              rows={6}
            />
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Box sx={{ pt: 3 }}>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </Box>
  );
};

export default ContactForm;
