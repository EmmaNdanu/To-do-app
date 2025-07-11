import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const categoryColors = {
  Education: '#f59e0b',
  'Health/Fitness': '#10b981',
  Home: '#3b82f6',
  Work: '#6366f1',
  Personal: '#ec4899',
  Other: '#9ca3af',
};

function TaskItem({ task, onDelete, onEdit, onComplete, onDuplicate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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

  const handleDuplicate = async () => {
    try {
      const newTask = { ...task, id: undefined, completed: false };
      const res = await axios.post('http://localhost:5000/tasks', newTask);
      onDuplicate(res.data);
    } catch (err) {
      console.error('Failed to duplicate task');
    }
  };

  const getStatus = () => {
    if (task.completed) return '✅ Completed';
    const now = new Date();
    const due = new Date(task.dueDate);
    return due < now ? `❌ Not completed on time (${daysOverdue(due)} days ago)` : '🟢 On Time';
  };

  const daysOverdue = (dueDate) => {
    const now = new Date();
    const diffTime = now - dueDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDayLabel = () => {
    if (!task.dueDate) return 'No Date';
    return new Date(task.dueDate).toLocaleString('en-US', { weekday: 'short' });
  };

  const timeInfo = () => {
    const date = new Date(task.dueDate);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Home':
        return '🏠';
      case 'Education':
        return '📚';
      case 'Health/Fitness':
        return '🏋️‍♂️';
      case 'Work':
        return '💼';
      case 'Personal':
        return '💖';
      default:
        return '📌';
    }
  };

  const getCardColor = () => {
    if (task.completed) return '#10b981'; // green
    const due = new Date(task.dueDate);
    if (due < new Date()) return '#ef4444'; // red
    return '#facc15'; // yellow
  };

  return (
    <div
      style={{
        backgroundColor: getCardColor(),
        borderRadius: '16px',
        padding: '16px',
        color: '#1e293b',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{task.title}</h3>
          <p style={{ fontSize: '0.95rem' }}>{task.description}</p>
        </div>

        {/* Menu & Day */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{getDayLabel()}</div>
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={toggleDropdown}
              style={{
                fontSize: '1.3rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              ⋮
            </button>
            {dropdownOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem} onClick={handleComplete}>
                  ✔ {task.completed ? 'Undo' : 'Mark Done'}
                </div>
                <div style={styles.dropdownItem} onClick={() => onEdit(task)}>
                  ✏ Edit
                </div>
                <div style={styles.dropdownItem} onClick={handleDelete}>
                  🗑 Delete
                </div>
                <div style={styles.dropdownItem} onClick={handleDuplicate}>
                  📄 Duplicate
                </div>
                <div style={{ ...styles.dropdownItem, opacity: 0.4 }}>📌 Pin (soon)</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* Category */}
        <span style={styles.badge(task.category)}>
          {getCategoryIcon(task.category)} {task.category}
        </span>

        {/* Time Info + Status */}
        <span style={{ fontSize: '0.9rem' }}>
          📅 {timeInfo()} • {getStatus()}
        </span>
      </div>
    </div>
  );
}

const styles = {
  dropdown: {
    position: 'absolute',
    top: '28px',
    right: '0',
    background: '#111827',
    borderRadius: '10px',
    padding: '6px 0',
    width: '160px',
    zIndex: 999,
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
  dropdownItem: {
    padding: '10px 16px',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: '0.95rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    transition: 'all 0.2s',
  },
  badge: (category) => ({
    padding: '4px 8px',
    backgroundColor: categoryColors[category] || '#999',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.8rem',
    marginRight: '10px',
  }),
};

export default TaskItem;
