import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './ReadTask.css'; 
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const navigate =  useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ taskName: '', taskDesc: '' });
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });
  const [sorting, setSorting] = useState({ orderBy: 'taskName', isAscending: true });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5289/api/Tasks', {
          params: { ...filters, ...pagination, ...sorting }
        });
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters, pagination, sorting]);

  const handleComplete = async (taskId) => {
    try {
    const taskSelected = tasks.filter(x=> x.id === taskId)

      await axios.put(`http://localhost:5289/api/Tasks/${taskId}`, 
        {
          "task_Name": taskSelected[0].task_Name,
          "task_Description": taskSelected[0].task_Description,
          "updatedDate": new Date().toISOString(),
          "isCompleted": true
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = async (taskId) => {
    navigate(`/task/${taskId}`)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setPagination({ ...pagination, [name]: parseInt(value) });
  };

  const handleSortingChange = (orderBy) => {
    setSorting({ orderBy, isAscending: !sorting.isAscending });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formBasicTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskName"
              placeholder="Enter task name"
              value={filters.taskName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBasicTaskDesc">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              name="taskDesc"
              placeholder="Enter task description"
              value={filters.taskDesc}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formBasicPageSize">
            <Form.Label>Page Size</Form.Label>
            <Form.Control as="select" name="pageSize" value={pagination.pageSize} onChange={handleSelectChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBasicSorting" style={{marginTop:"30px"}}>
            <Button variant="primary" onClick={() => handleSortingChange('taskName')}>
              Sort by Task Name {sorting.orderBy === 'taskName' && (sorting.isAscending ? '▲' : '▼')}
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Container className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks.length > 0 ? (
            tasks.map((task) => (
              <Card key={task.id} className="task-card">
                <Card.Body>
                  <Card.Title>{task.task_Name}</Card.Title>
                  <div className="actions">
                    {!task.isCompleted && (
                      <Button variant="success" onClick={() => handleComplete(task.id)}>
                        Complete
                      </Button>
                    )}
                    <Button variant="warning" onClick={() => handleEdit(task.id)}>
                      Edit
                    </Button>
                  </div>
                  <Badge pill variant={task.isCompleted ? 'success' : 'warning'}>
                    {task.isCompleted ? 'Completed' : 'New'}
                  </Badge>
                  <Card.Text>
                    <strong>Description:</strong> {task.task_Description}<br />
                    <strong>Created:</strong> {new Date(task.createdDate).toLocaleString()}<br />
                    <strong>Updated:</strong> {new Date(task.updatedDate).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No tasks found.</p>
          )
        )}
      </Container>
    </Container>
  );
};

export default TaskList;
