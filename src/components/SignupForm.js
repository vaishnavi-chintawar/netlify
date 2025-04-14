// src/components/SignupForm.js
import React, { useState } from "react";

const SignupForm = ({ onSignupSuccess, switchToLogin, setAuthMessage }) => {
  const [signUpName, setSignUpName] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!signUpName || !signUpPhone || !signUpEmail || !signUpPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    onSignupSuccess({
      username: signUpEmail,
      password: signUpPassword,
      name: signUpName,
      phone: signUpPhone,
    });
  };

  return (
    <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "10px" }}>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter full name"
        style={inputStyle}
        value={signUpName}
        onChange={(e) => setSignUpName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter phone number"
        style={inputStyle}
        value={signUpPhone}
        onChange={(e) => setSignUpPhone(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Enter email"
        style={inputStyle}
        value={signUpEmail}
        onChange={(e) => setSignUpEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        style={inputStyle}
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        style={inputStyle}
        value={signUpConfirmPassword}
        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" style={buttonStyle}>
        Sign Up
      </button>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#5E60CE", cursor: "pointer", fontWeight: "bold" }}
          onClick={switchToLogin}
        >
          Sign In
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
