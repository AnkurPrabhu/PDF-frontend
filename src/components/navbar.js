import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { checkLogin, postLogout } from "./helper/apicalls";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function NavbarComponent() {
  const navigate = useNavigate;
  const handleLogout = (e) => {
    postLogout().then((result) => {
      window.location.href = "/login";
    });
  };

  const handleLogin = (e) => {
    window.location.href = "/login";
  };
  const [loggedin, setLoggedin] = useState(false);
  const check = () => {
    checkLogin().then((data) => {
      setLoggedin(data.isLoggedIn);
    });
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Dashboard"> PDF </Navbar.Brand>
        <Navbar.Toggle />
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/fileupload">Uplaod</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {loggedin ? (
              <Button onClick={handleLogout}>Logout </Button>
            ) : (
              <Button onClick={handleLogin}>Login </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
