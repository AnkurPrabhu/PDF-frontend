import React, { useState } from "react";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostSignup } from "./helper/apicalls";
const Signup = () => {
  const [name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    SetName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmpassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here using email and password
    if (password !== confirmpassword) {
      setError("Error: passwords dont match");
      return;
    }

    if (email.length == 0 || name.length == 0 || password.length == 0) {
      setError("Error: All fields are compulsory");
      return;
    }
    let body = {
      name: name,
      email: email,
      password: password,
    };

    PostSignup(body).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError("Error : " + data.error);
      } else {
        window.location.href = "/login";
      }
    });
  };

  return (
    <div>
      <div className="main__bg "> </div>
      <div className="d-flex justify-content-center align-items-center vh-100  ">
        <div className="login-container  ">
          <Form onSubmit={handleLogin}>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="forName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="your name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>
            <p></p>
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
            <Form.Group controlId="formPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Confirm Password"
                value={confirmpassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
            <p></p>
            <Button variant="primary" type="submit">
              Signup
            </Button>
            <p></p>
            <Form.Label>Already have an account ?</Form.Label>

            <Link to="/login">login</Link>
            <Link />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
