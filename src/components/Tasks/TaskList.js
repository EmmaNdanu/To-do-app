// src/components/Tasks/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useAuth } from '../../context/AuthContext';

const TaskList = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/tasks?userId=${currentUser.id}`);
        setTasks(res.data);
      } catch (err) {
        alert('Error fetching tasks');
      }
    };

    fetchTasks();
  }, [currentUser]);

  const handleTaskAdded = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
