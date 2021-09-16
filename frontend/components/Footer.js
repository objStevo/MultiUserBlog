import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <StyledContainer>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
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
    </StyledContainer>
  );
};

export default Footer;
