// src/context/QueriesContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const QueriesContext = createContext();
export const useQueries = () => useContext(QueriesContext);

// === set API base here ===
// change to "http://localhost:5000/api/queries" if your backend uses /api/queries
const API_BASE = "http://localhost:5000/api/contact";

export const QueriesProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchQueries = async () => {
    try {
      const res = await axios.get(API_BASE);
      setQueries(res.data || []);
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a public query (Contact form)
  const addQuery = async (payload) => {
    try {
      const res = await axios.post(API_BASE, payload);
      // put newest first
      setQueries((p) => [res.data, ...p]);
      return res.data;
    } catch (err) {
      console.error("Failed to submit query:", err);
      throw err;
    }
  };

  // Add answer (requires token)
  // Add answer (requires token)
const addAnswer = async (queryId, answerText) => {
  try {
    if (!token) {
      alert("You must be logged in to reply.");
      return;
    }

    console.log("Sending token >>>", token);

    const res = await axios.post(
      `${API_BASE}/${queryId}/answer`,
      { answer: answerText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updated = res.data;
    setQueries((prev) =>
      prev.map((q) => (q._id === updated._id ? updated : q))
    );
    return updated;
  } catch (err) {
    console.error("Failed to submit answer:", err.response?.data || err);

    if (err.response?.status === 401) {
      alert(err.response?.data?.message || "Session expired. Please login again.");
    }

    throw err;
  }
};


  // Edit answer (only owner)
  const editAnswer = async (queryId, answerId, newText) => {
    try {
      if (!token) throw new Error("Not authenticated");
      const res = await axios.put(
        `${API_BASE}/${queryId}/answer/${answerId}`,
        { answer: newText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updated = res.data;
      setQueries((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));
      return updated;
    } catch (err) {
      console.error("Failed to edit answer:", err);
      throw err;
    }
  };

  // Delete answer (only owner)
  const deleteAnswer = async (queryId, answerId) => {
    try {
      if (!token) throw new Error("Not authenticated");
      const res = await axios.delete(`${API_BASE}/${queryId}/answer/${answerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data.query || res.data; // backend might return {message, query}
      setQueries((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));
      return updated;
    } catch (err) {
      console.error("Failed to delete answer:", err);
      throw err;
    }
  };

  return (
    <QueriesContext.Provider
      value={{ queries, loading, fetchQueries, addQuery, addAnswer, editAnswer, deleteAnswer }}
    >
      {children}
    </QueriesContext.Provider>
  );
};
