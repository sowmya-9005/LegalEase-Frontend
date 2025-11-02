// src/pages/QueriesPage.jsx
import React, { useState } from "react";
import { useQueries } from "../context/QueriesContext";
import { useAuth } from "../context/AuthContext";
import "./QueriesPage.css";
import { FaBalanceScale, FaCommentDots, FaUserLock } from "react-icons/fa";

const QueriesPage = () => {
  const { queries, loading, addAnswer, editAnswer, deleteAnswer } = useQueries();
  const { user } = useAuth();
  const [replyText, setReplyText] = useState({});
  const [editing, setEditing] = useState({});

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  const submitReply = async (queryId) => {
    if (!user) {
      alert("You must be logged in to reply.");
      return;
    }

    try {
      const text = (replyText[queryId] || "").trim();
      if (!text) return alert("Enter reply text");
      await addAnswer(queryId, text);
      setReplyText((p) => ({ ...p, [queryId]: "" }));
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to submit reply");
    }
  };

  const startEdit = (answer) => {
    setEditing({ [answer._id]: answer.answer });
  };

  const saveEdit = async (queryId, answerId) => {
    try {
      const newText = (editing[answerId] || "").trim();
      if (!newText) return alert("Enter new text");
      await editAnswer(queryId, answerId, newText);
      setEditing({});
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to edit reply");
    }
  };

  const confirmDelete = async (queryId, answerId) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      await deleteAnswer(queryId, answerId);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to delete reply");
    }
  };

  return (
    <div>
      {/* === HEADER SECTION === */}
      <div className="queries-header">
        
        <div>
          <h1>Queries</h1>
         
        </div>
      </div>

      {/* === MAIN QUERIES GRID === */}
      <div className="queries-container">
        {queries.length === 0 && <p>No queries yet.</p>}

        {queries.map((q) => (
          <div key={q._id} className="query-card">
            <div className="query-header">
              <h3>{q.category || "General"}</h3>
              <small>By {q.name} — {new Date(q.createdAt).toLocaleString()}</small>
            </div>

            <p className="query-message">{q.message}</p>

            <div className="answers-section">
              <h4>Replies</h4>

              {q.answers?.length === 0 && (
                <div className="no-replies">No replies yet</div>
              )}

              {q.answers?.map((a) => (
                <div key={a._id} className="answer-box">
                  <div className="answer-meta">
                    <div className="answer-user">
                      👤 {a.answeredByUsername || "Anonymous"} ({a.answeredByEmail || "No Email"})
                    </div>
                    <span className="answer-date">
                      {a.date ? new Date(a.date).toLocaleString() : ""}
                    </span>
                  </div>

                  {editing[a._id] !== undefined ? (
                    <>
                      <textarea
                        value={editing[a._id]}
                        onChange={(e) => setEditing({ [a._id]: e.target.value })}
                      />
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(q._id, a._id)}>Save</button>
                        <button onClick={() => setEditing({})}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="answer-text">{a.answer}</p>

                      {user && (user.username === a.answeredByUsername || user.email === a.answeredByEmail) && (
                        <div className="answer-actions">
                          <button onClick={() => startEdit(a)}>Edit</button>
                          <button onClick={() => confirmDelete(q._id, a._id)}>Delete</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {user ? (
              <div className="reply-box">
                <textarea
                  placeholder="Write a reply..."
                  value={replyText[q._id] || ""}
                  onChange={(e) => setReplyText((p) => ({ ...p, [q._id]: e.target.value }))}
                />
                <button disabled={!user} onClick={() => submitReply(q._id)}>
                  Submit Reply
                </button>
              </div>
            ) : (
              <div className="login-msg">
                <FaUserLock /> Login to reply
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueriesPage;
