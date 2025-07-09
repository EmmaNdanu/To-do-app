import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(() => {
// 🔁 Load user from localStorage on first render
const storedUser = localStorage.getItem('currentUser');
return storedUser ? JSON.parse(storedUser) : null;
});
const login = (user) => {
setCurrentUser(user);
localStorage.setItem('currentUser', JSON.stringify(user)); // ✅ save to localStorage
};
const logout = () => {
setCurrentUser(null);
localStorage.removeItem('currentUser'); // ✅ remove from localStorage
};
return (
<AuthContext.Provider value={{ currentUser, login, logout }}>
{children}
</AuthContext.Provider>
);
};

// ✅ Custom hook to access auth
export const useAuth = () => useContext(AuthContext);
