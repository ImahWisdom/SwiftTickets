import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (session && session.username) {
      setIsLoggedIn(true);
      setUsername(session.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SwiftTickets</Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {!isLoggedIn ? (
          <>
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Get Started</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tickets">Tickets</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;


