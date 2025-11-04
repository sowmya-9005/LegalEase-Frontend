// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // ✅ Sync state with localStorage on changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

  // ✅ Listen for token updates (important!)
  useEffect(() => {
    const syncAuth = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // ✅ Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000;

      if (Date.now() >= expiryTime) {
        console.warn("⛔ Token expired, logging out...");
        logout();
      } else {
        const timeout = expiryTime - Date.now();
        console.log("✅ Token valid, auto-logout in:", timeout / 1000, "seconds");

        // auto logout when expiry is reached
        const timer = setTimeout(() => logout(), timeout);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Invalid token format", err);
      logout();
    }
  }, [token]);

  const login = ({ user: userObj, token: jwt }) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("token", jwt);

    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";  // ✅ redirect to home
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
