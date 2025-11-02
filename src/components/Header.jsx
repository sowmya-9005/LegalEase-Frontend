import React from "react";
import { NavLink } from "react-router-dom";
import { FaBalanceScale } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" className="logo">
          <FaBalanceScale className="logo-icon" />
          LegalEase
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/rights">Know Your Rights</NavLink>
          <NavLink to="/emergency">Emergency</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/queries">Queries</NavLink>
        </nav>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="welcome-msg">Welcome, {user.name} ({user.role})</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="login-btn">Login</NavLink>
            <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
