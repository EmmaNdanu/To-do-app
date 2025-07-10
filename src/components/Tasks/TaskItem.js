// src/components/Tasks/TaskItem.js
import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onDelete, onEdit, onComplete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${task.id}`);
      onDelete(task.id);
    } catch (err) {
      console.error('Failed to delete task');
    }
  };

  const handleComplete = async () => {
    try {
      const updated = { ...task, completed: !task.completed };
      const res = await axios.put(`http://localhost:5000/tasks/${task.id}`, updated);
      onComplete(res.data);
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const getStatus = () => {
    if (task.completed) return '✅ Completed';
    if (task.dueDate) {
      const due = new Date(task.dueDate);
      const today = new Date();
      if (due < today) return '❌ Overdue';
      return '🔜 Upcoming';
    }
    return '📝';
  };

  return (
    <li>
      <strong>{task.title}</strong> ({getStatus()}) {task.dueDate && `📅 ${task.dueDate}`}
      <button onClick={handleComplete} style={{ marginLeft: '10px' }}>
        ✔
      </button>
      <button onClick={() => onEdit(task)} style={{ marginLeft: '5px' }}>
        ✏
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '5px' }}>
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
