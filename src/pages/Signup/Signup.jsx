import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || {};

    if (users[email]) {
      setError("Email already registered. Please log in instead.");
      return;
    }

    // Save user data
    users[email] = { username, email, password };
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    // Save logged-in user info separately for session
    localStorage.setItem(
      "ticketapp_loggedin_user",
      JSON.stringify({ username, email })
    );

    // Redirect directly to dashboard using navigate
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <button className="btn-gradient">Sign Up</button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

