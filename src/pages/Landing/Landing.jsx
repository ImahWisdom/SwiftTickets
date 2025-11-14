import React from "react";
import "./Landing.css";
import { FaTicketAlt, FaShieldAlt, FaClock, FaHeadset, FaChartBar, FaCheckCircle } from "react-icons/fa";

const Landing = () => {
  return (
    <>
      <main className="landing">

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <h1>SwiftTickets</h1>
            <p>Manage, track, and resolve tickets seamlessly with SwiftTickets.</p>
            <div className="hero-buttons">
              <a href="/auth/signup" className="btn-primary">Start Free Trial</a>
              <a href="/auth/login" className="btn-secondary">Sign In</a>
            </div>
          </div>

          {/* Bubbles Animation */}
          <div className="bubbles">
            {[...Array(8)].map((_, i) => <span key={i} className="bubble"></span>)}
          </div>
        </section>

        {/* WHY CHOOSE SWIFTTICKETS */}
        <section className="why-us">
          <h2>Why Choose SwiftTickets?</h2>
          <div className="cards-grid">
            <div className="card"><FaTicketAlt size={40} className="icon"/><h3>Fast Ticket Creation</h3><p>Create tickets instantly and stay organized.</p></div>
            <div className="card"><FaHeadset size={40} className="icon"/><h3>24/7 Support</h3><p>Assistance whenever you need it.</p></div>
            <div className="card"><FaClock size={40} className="icon"/><h3>Real-Time Updates</h3><p>Always know the status of your tickets.</p></div>
            <div className="card"><FaChartBar size={40} className="icon"/><h3>Analytics Dashboard</h3><p>Track performance and resolve faster.</p></div>
            <div className="card"><FaShieldAlt size={40} className="icon"/><h3>Secure & Reliable</h3><p>Your data is safe with us.</p></div>
            <div className="card"><FaCheckCircle size={40} className="icon"/><h3>Fully Responsive</h3><p>Use SwiftTickets on any device.</p></div>
          </div>
        </section>

        {/* READY TO GET STARTED */}
        <section className="cta">
          <h2>Ready to get started?</h2>
          <a href="/auth/signup" className="btn-primary">Get Started Now</a>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2025 SwiftTickets. All rights reserved ❤️ by Wisdom</p>
        </footer>

      </main>
    </>
  );
};

export default Landing;

