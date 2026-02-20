import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginSignal, setLoginSignal] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/checkToken",
        { withCredentials: true }
      );
      setLoginSignal(res.data.message === "success");
    } catch {
      setLoginSignal(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loginSignal, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};