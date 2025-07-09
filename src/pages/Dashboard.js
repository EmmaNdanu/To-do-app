import React from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/Tasks/TaskList';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {currentUser.name}</h2>
      <button onClick={logout}>Logout</button>
      <TaskList />
    </div>
  );
};

export default Dashboard;
