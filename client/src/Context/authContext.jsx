import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginSignal, setLoginSignal] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/checkToken",
        { withCredentials: true }
      );
      setLoginSignal(res.data.message === "success");
      setIsAdmin(res.data.isAdmin || false);
    } catch {
      setLoginSignal(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loginSignal, checkAuth, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};