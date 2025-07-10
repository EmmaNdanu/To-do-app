// src/components/Tasks/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useAuth } from '../../context/AuthContext';

const TaskList = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tasks?userId=${currentUser.id}`);
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks');
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

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const handleComplete = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      <TaskForm
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        onUpdate={handleUpdate}
      />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onComplete={handleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
