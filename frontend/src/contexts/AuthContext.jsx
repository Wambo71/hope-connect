import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    // Mock login
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({ email, role: 'admin' });
      setIsAdmin(true);
    } else if (email === 'user@example.com' && password === 'password') {
      setUser({ email, role: 'user' });
      setIsAdmin(false);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}