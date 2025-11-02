import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Enter email and password");

    try {
      const res = await axios.post("https://legalease-backend-y5nn.onrender.com/api/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      login({ user: res.data.user, token: res.data.token }); // ✅ updates AuthContext
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
  <div className="login-box">
    <h2 className="login-title">Login</h2>
    <p className="login-subtext">Sign in to access your account</p>

    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="login-btn">
        Login
      </button>
    </form>
  </div>
</div>

  );
};


export default Login;
