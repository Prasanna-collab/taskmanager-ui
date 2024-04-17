import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve ID from URL params

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch task details when component mounts
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5289/api/Tasks/${id}`);
        const { task_Name, task_Description, isCompleted } = response.data;
        setTaskName(task_Name);
        setTaskDescription(task_Description);
        setIsCompleted(isCompleted);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('Error fetching task details. Please try again.');
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5289/api/Tasks/${id}`, {
        task_Name: taskName,
        task_Description: taskDescription,
        isCompleted: isCompleted,
        updatedDate: new Date().toISOString()
      });
       console.log(new Date().toISOString())
      if (response.status === 200) {
        message.success("Task updated successfully!");
        navigate('/tasks');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        const errorMessage = Object.keys(validationErrors).map(key => `${key}: ${validationErrors[key]}`).join(', ');
        setError(errorMessage);
      } else {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="custom-card">
        <Col md={6} lg={12} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTaskName" className="form-group">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicTaskDescription" className="form-group">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicIsCompleted" className="form-group">
              <Form.Check
                type="checkbox"
                label="Is Completed?"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            </Form.Group>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="text-center">
              <Button variant="primary" type="submit" className="custom-button">
                Update Task
              </Button>
            </div>
          </Form>
        </Col>
      </Card>
    </Container>
  );
};

export default UpdateTask;
