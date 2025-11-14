import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || {};

    if (!users[email]) {
      setError("No account found with this email. Please sign up first.");
      return;
    }

    if (users[email].password !== password) {
      setError("Incorrect password. Try again.");
      return;
    }

    // save session
    const session = {
      email: email,
      username: users[email].username,
    };

    localStorage.setItem("ticketapp_session", JSON.stringify(session));

    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin} className="auth-form">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-gradient">Login</button>
        </form>

        <p className="bottom-text">
          Don't have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


