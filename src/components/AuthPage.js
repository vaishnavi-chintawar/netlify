// src/components/AuthPage.js
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = ({ onLoginSuccess, onSignupSuccess, setAuthMessage }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const containerStyle = { display: "flex", minHeight: "100vh" };

  const leftStyle = {
    flex: 1,
    maxWidth: "600px",
    backgroundColor: "lightblue",
    padding: "40px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const rightStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: 600,
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <h2 style={headingStyle}>Task Mangement</h2>
        {isSignUp ? (
          <SignupForm
            onSignupSuccess={onSignupSuccess}
            switchToLogin={() => setIsSignUp(false)}
            setAuthMessage={setAuthMessage}
          />
        ) : (
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            switchToSignup={() => setIsSignUp(true)}
            setAuthMessage={setAuthMessage}
          />
        )}
      </div>
      <div style={rightStyle}>
        {/* You can place an image here if desired */}
        <img
          src="login.jpeg"
          alt="Login"
          style={{
            display: "block",
            maxWidth: "70%",
            maxHeight: "70%",
            objectFit: "contain",
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;
