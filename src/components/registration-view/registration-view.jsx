import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");

  const formValidation = () => {
    // let usernameError = {};
    // let passwordError = {};
    // let emailError = {};
    // let birthdayError = {};
    let isValid = true;
    if (username.trim().length < 6) {
      setUsernameError("Username incorrect. Use at least 4 characters.");
      isValid = false;
    }
    if (password.trim().length < 6) {
      setPasswordError("Password incorrect. Use at least 5 characters.");
      isValid = false;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      setEmailError("Email address incorrect.");
      isValid = false;
    }
    if (birthday === "") {
      setBirthdayError("Please enter your birthday.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios
        .post("https://themyflixapi.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log("error registering the user");
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col xs={6}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Please Register</Card.Title>
                <br></br>
                <Form>
                  <Form.Group controlId="formUsernameReg">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      placeholder="Your Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* code added here to display validation error */}
                    {usernameError && (
                      <p style={{ color: "red" }}>{usernameError}</p>
                    )}
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formPasswordReg">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />
                    {/* code added here to display validation error */}
                    {passwordError && (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    )}
                    <br></br>
                  </Form.Group>
                  <Form.Group controlId="formEmailReg">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email Address"
                    />
                    {/* code added here to display validation error */}
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                    <br></br>
                  </Form.Group>
                  <Form.Group controlId="formBirthdayReg">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                    {/* code added here to display validation error */}
                    {birthdayError && (
                      <p style={{ color: "red" }}>{birthdayError}</p>
                    )}
                  </Form.Group>
                  <br></br>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                    style={{ margin: "32px" }}
                  >
                    Register
                  </Button>
                  <Link to={"/"}>
                    <Button
                      variant="warning"
                      className="login-button"
                      style={{ margin: "32px" }}
                    >
                      Back To Login Screen
                    </Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
  }),
};
