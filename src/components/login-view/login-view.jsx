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
// https://themyflixapi.herokuapp.com/login

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be 4 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios
        .post("https://themyflixapi.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
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
                <Card.Title className="text-center">Please Log In</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      placeholder="Your Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* code added here to display validation error */}
                    {usernameErr && (
                      <p style={{ color: "red" }}>{usernameErr}</p>
                    )}
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* code added here to display validation error */}
                    {passwordErr && (
                      <p style={{ color: "red" }}>{passwordErr}</p>
                    )}
                  </Form.Group>
                  <br></br>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                    style={{ margin: "32px" }}
                  >
                    Submit
                  </Button>

                  <Link to={"/register"}>
                    <Button
                      variant="warning"
                      className="register-button"
                      style={{ margin: "32px" }}
                    >
                      Register
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

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};
