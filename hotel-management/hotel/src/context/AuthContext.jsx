// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check token on first load
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("jwtToken");
      if (token) {
        try {
          const response = await api.get("/validate");
          if (response.status === 200) {
            const username = response.data.user;  // assuming { user: "username" }
            setUser(username);

            // ✅ Fetch email only once user is confirmed
            const details = await api.post("/details", { username });
            setEmail(details.data.email);
          } else {
            Cookies.remove("jwtToken");
            setUser(null);
          }
        } catch (error) {
          Cookies.remove("jwtToken");
          setUser(null);
          console.error("Token validation failed:", error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []); // ⛔ Don't add `user` here

  // ✅ Login method
  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });

      if (response.data.token) {
        // Store JWT token in a cookie
        Cookies.set("jwtToken", response.data.token, { expires: 7 }); // Store token with expiry of 7 days
        setUser(username);

        // Fetch email after setting user
        const details = await api.post(
          "/details",
          { username },
          { headers: { Authorization: `Bearer ${response.data.token}` } }
        );
        setEmail(details.data.email);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setEmail(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
