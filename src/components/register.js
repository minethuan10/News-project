import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Card, Container, Form, Button } from "react-bootstrap";
import NavBar from './navbar';
import { Helmet } from 'react-helmet';

function Register({ darkMode }) { // Added darkMode prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>NewsForYou - Register</title> {/* Set the page title */}
      </Helmet>
      <NavBar darkMode={darkMode} />
      <Container className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? 'dark-mode' : ''}`}>
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Form onSubmit={handleRegister}>
              <h3 className="text-center">Sign Up</h3>

              <Form.Group className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
              <p className="forgot-password text-right mt-3">
                Already registered <a href="/login">Login</a>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Register;
