import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const categories = ['Education', 'Health/Fitness', 'Home', 'Work', 'Personal'];

const TaskForm = ({ onTaskAdded, editingTask, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || '');
      setCategory(editingTask.category || 'Personal');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      dueDate,
      category,
      completed: editingTask?.completed || false,
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

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('Personal');
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{editingTask ? 'Update Task' : 'Add a New Task'}</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        style={styles.input}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows="3"
        style={styles.textarea}
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        style={styles.input}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit" style={styles.button}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '1.2rem',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical'
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#e91e63',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default TaskForm;
