import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Test <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Box>
  );
};

export default Footer;
