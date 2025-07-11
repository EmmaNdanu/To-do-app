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
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">🗂️ Your Tasks</h2>

      <TaskForm
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        onUpdate={handleUpdate}
      />

      {/* Task Cards */}
      <div className="mt-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="mb-6">
              <TaskItem
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onDuplicate={(newTask) => setTasks([...tasks, newTask])}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
