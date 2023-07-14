import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { PostLogin } from "./helper/apicalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate;
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    PostLogin(body).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError("Error : " + data.error);
      } else {
        window.location.href = "/dashboard";
      }
    });

    // Reset the form fields
  };

  return (
    <div>
      <div className="main__bg "> </div>
      <div className="d-flex justify-content-center align-items-center vh-100  ">
        <div className="login-container  ">
          <Form onSubmit={handleLogin}>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <p> </p>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <p></p>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <p></p>
            <Form.Label>Dont Have an Account ?</Form.Label>

            <Link to="/signup">Signup</Link>
            <Link />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
