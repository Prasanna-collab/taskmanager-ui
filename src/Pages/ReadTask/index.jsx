import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import './ReadTask.css';
import { useNavigate } from 'react-router-dom'; // Import CSS file for custom styles

const ReadTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5289/api/Tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:5289/api/Tasks/${taskId}`, {
        isCompleted: true
      });
      // Update task status in UI
      // For demonstration, you can reload the tasks from the server or update the tasks array directly
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = async (taskId) => {
    // try {
    //   await axios.put(`http://localhost:5289/api/Tasks/${taskId}`);
    //   // Remove task from UI
    //   // For demonstration, you can reload the tasks from the server or update the tasks array directly
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    navigate(`/task/${taskId}`)
  };

  return (
    <div className="task-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map(task => (
          <Card key={task.id} className="task-card">
            <Card.Body>
              <Card.Title>{task.task_Name}</Card.Title>
              <div className="actions">
                {!task.isCompleted && (
                  <Button variant="success" onClick={() => handleComplete(task.id)}>Complete</Button>
                )}
                <Button variant="warning" onClick={() => handleEdit(task.id)}>Edit</Button>
              </div>
              <Badge pill variant={task.isCompleted ? 'success' : 'warning'}>{task.isCompleted ? 'Completed' : 'New'}</Badge>
              <Card.Text>
                <strong>Description:</strong> {task.task_Description}<br />
                <strong>Created:</strong> {new Date(task.createdDate).toLocaleString()}<br />
                <strong>Updated:</strong> {new Date(task.updatedDate).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReadTask;
