import { Children, createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert, AlertDetele } from "../utils/alert";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
 
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saveToken = localStorage.getItem("tokenUserLogin");
    const saveUser = localStorage.getItem("user");
    if (saveToken && saveUser) {
      setToken(saveToken);
      setUser(JSON.parse(saveUser));
    }
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem("tokenUserLogin", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logOut = async () => {
  
      Alert("شما خارج شدید","success")
      localStorage.removeItem("tokenUserLogin");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
  
      <Navigate to="/home" />;
    
  };

    const logOutAdmin = async () => {
  
      Alert("شما خارج شدید","success")
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      
      <Navigate to="/home" />;
    
  };
  
  const isAuthenticated = !!token;
  const ProtectedRouteLogin = (children) => {
    return isAuthenticated ? <Navigate to="/home" replace /> : children;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, ProtectedRouteLogin, logOut,logOutAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
