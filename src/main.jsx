import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { QueriesProvider } from "./context/QueriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueriesProvider>
        <App />
      </QueriesProvider>
      </AuthProvider>
  </React.StrictMode>
);
