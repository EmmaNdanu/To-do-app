// src/components/Tasks/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const TaskForm = ({ onTaskAdded, editingTask, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate || '');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      completed: editingTask?.completed || false,
      dueDate,
      userId: currentUser.id
    };

    try {
      if (editingTask) {
        const res = await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, taskData);
        onUpdate(res.data);
      } else {
        const res = await axios.post('http://localhost:5000/tasks', taskData);
        onTaskAdded(res.data);
      }

      setTitle('');
      setDueDate('');
    } catch (err) {
      console.error('Error saving task');
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
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
