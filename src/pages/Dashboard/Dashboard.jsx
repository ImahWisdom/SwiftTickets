import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  const username = session?.username || "User";

  useEffect(() => {
    let allTickets = [];
    try {
      const rawTickets = localStorage.getItem("tickets");
      allTickets = JSON.parse(rawTickets) || [];
      if (!Array.isArray(allTickets)) allTickets = [];
    } catch (err) {
      allTickets = [];
    }

    const userTickets = allTickets.filter((t) => t.username === username);

    const openTickets = userTickets.filter((t) => t.status === "open").length;
    const inProgress = userTickets.filter(
      (t) => t.status === "in_progress"
    ).length;
    const closedTickets = userTickets.filter((t) => t.status === "closed").length;

    setStats({
      total: userTickets.length,
      open: openTickets,
      inProgress,
      closed: closedTickets,
    });
  }, [username]);

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  const handleCardClick = (status) => {
    if (status === "total") navigate("/tickets");
    else navigate(`/tickets?status=${status}`);
  };

  return (
    <>
    <div className="dashboard-container">
      <div className="dash-header">
        <h2>Welcome, {username} 👋</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total" onClick={() => handleCardClick("total")}>
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card open" onClick={() => handleCardClick("open")}>
          <h3>Open Tickets</h3>
          <p>{stats.open}</p>
        </div>
        <div
          className="stat-card progress"
          onClick={() => handleCardClick("in_progress")}
        >
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>
        <div className="stat-card closed" onClick={() => handleCardClick("closed")}>
          <h3>Closed Tickets</h3>
          <p>{stats.closed}</p>
        </div>
      </div>

      <div className="dashboard-footer">
        <button
          className="manage-tickets-btn"
          onClick={() => navigate("/tickets")}
        >
          Go to Ticket Management
        </button>
      </div>
    </div>
      
      <footer className="footer">
      <p>© 2025 SwiftTickets. All rights reserved ❤️ by Wisdom</p>
    </footer>
    </>
  );
}

export default Dashboard;




