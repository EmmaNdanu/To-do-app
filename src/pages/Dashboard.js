import React from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/Tasks/TaskList';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    else if (hour < 18) return 'Good afternoon';
    else return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-800 to-slate-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{getGreeting()}, {currentUser?.name}</h1>
            <p className="text-slate-300 text-sm">Let’s plan your day productively 🚀</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold shadow-md"
          >
            Logout
          </button>
        </header>

        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
