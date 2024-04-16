import React, { useState } from 'react';
import { Form, Button, Col, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import CSS file for custom styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5289/api/Auth/Login', {
        userName: email,
        password: password
      });

      // Check if authentication is successful
      if (response.status === 200) {
        // Redirect to /add
        navigate('/add');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };
  const handleNavigate= ()=> {
    navigate("/signup")
      };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="background"></div> {/* Add background div */}
      <Card className="custom-card">
        <Col md={6} lg={12} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="form-group">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="text-center">
              <Button variant="primary" type="submit" className="custom-button">
                Login
              </Button>
              <div className="mt-3">
                Don't have an account? <br />
                <Button variant="primary" className="custom-button" onClick={handleNavigate}>
                  Create One
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Card>
    </Container>
  );
};

export default Login;
