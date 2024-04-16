import React, { useState } from 'react';
import { Form, Button, Col, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './Register.css'; 

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5289/api/Auth', {
        userName: userName,
        password: password,
        roles: [role]
      });
      message.success("User Created Successfully!");
      setUserName('');
      setPassword('');
      setRole('');
      navigate("/");
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleNavigate= ()=> {
navigate("/")
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="background"></div> {/* Add background div */}
      <Card className="custom-card">
        <Col md={6} lg={12} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUserName" className="form-group">
              <Form.Label>Username (Email)</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicRole" className="form-group">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="text-center">
              <Button variant="primary" type="submit" className="custom-button">
                Sign Up
              </Button>
              <div className="mt-3">
                Already have an account? <br />
                <Button variant="primary" className="custom-button" onClick={handleNavigate}>
                  Try Sign-in
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Card>
    </Container>
  );
};

export default SignUp;
