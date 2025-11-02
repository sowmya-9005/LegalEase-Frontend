// src/pages/Contact.jsx
import React, { useState } from "react";
import { useQueries } from "../context/QueriesContext";
import "./Contact.css"; // optional styling file

const Contact = () => {
  const { addQuery } = useQueries();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return alert("Please fill name, email and message");
    }

    setLoading(true);
    try {
      await addQuery(formData);
      alert("✅ Your query has been submitted");
      setFormData({ name: "", email: "", phone: "", category: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      alert(err.response?.data?.message || "Failed to submit query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
  <div className="contact-card">
    <h1 className="contact-title">Contact LegalEase</h1>
    <p className="contact-subtitle">Submit your legal query — public users can submit. Logged-in users can reply.</p>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Phone (optional)</label>
        <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select category</option>
          <option>Fundamental Rights</option>
          <option>Consumer Rights</option>
          <option>Women & Child Rights</option>
          <option>Digital Rights</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Describe your issue</label>
        <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} required />
      </div>

      <button className="contact-btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Query"}
      </button>
    </form>
  </div>
</div>

  );
};

export default Contact;
