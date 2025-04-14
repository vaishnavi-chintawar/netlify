// src/components/LoginForm.js
import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess, switchToSignup, setAuthMessage }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({ username: loginEmail, password: loginPassword });
  };

  const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    width: "100%",
  };
  const buttonStyle = {
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#5E60CE",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
    width: "100%",
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "10px" }}>Sign In</h2>
      <input
        type="email"
        placeholder="Enter email"
        style={inputStyle}
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        style={inputStyle}
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        required
      />
      <button type="submit" style={buttonStyle}>
        Sign In
      </button>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#5E60CE", cursor: "pointer", fontWeight: "bold" }}
          onClick={switchToSignup}
        >
          Sign Up
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
