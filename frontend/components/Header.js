import React, { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { isAuth, signout } from "../actions/auth";
import Router from "next/router";
import NProgress from "nprogress";
import ".././node_modules/nprogress/nprogress.css";
import Search from "./blog/Search";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar id="test" color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" href="">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/contact">
                  <NavLink>Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <Link href="/user/crud/blog">
                <NavLink className="btn btn-primary text-light">
                  Write a blog
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};
export default Header;
