// src/components/Tasks/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      completed: false,
      userId: currentUser.id
    };

    try {
      const res = await axios.post('http://localhost:5001/tasks', newTask);
      onTaskAdded(res.data);
      setTitle('');
    } catch (err) {
      alert('Error adding task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
