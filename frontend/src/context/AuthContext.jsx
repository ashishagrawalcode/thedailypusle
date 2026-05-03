import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bulletin_token');
    const storedUser = localStorage.getItem('bulletin_user');

    // Rigorous validation to catch any corrupted state (like 'undefined' string)
    if (!token || !storedUser || storedUser === 'undefined' || storedUser === 'null') {
      localStorage.removeItem('bulletin_token');
      localStorage.removeItem('bulletin_user');
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (e) {
      console.error("Corrupted user object in localStorage. Wiping state.", e);
      localStorage.removeItem('bulletin_token');
      localStorage.removeItem('bulletin_user');
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('bulletin_token', token);
    localStorage.setItem('bulletin_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('bulletin_token');
    localStorage.removeItem('bulletin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
