// src/components/Tasks/TaskItem.js
import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${task.id}`);
      onDelete(task.id);
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  return (
    <li>
      {task.title}
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
