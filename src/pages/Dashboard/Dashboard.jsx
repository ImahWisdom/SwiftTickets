import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
    deleted: 0,
  });
  const [deletedTickets, setDeletedTickets] = useState([]);
  const [deletedModal, setDeletedModal] = useState(null);

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

    const userTickets = allTickets.filter((t) => !t.deleted && t.username === username);
    const deletedUserTickets = allTickets.filter((t) => t.deleted && t.username === username);

    setDeletedTickets(deletedUserTickets);

    const openTickets = userTickets.filter((t) => t.status === "open").length;
    const inProgress = userTickets.filter((t) => t.status === "in_progress").length;
    const closedTickets = userTickets.filter((t) => t.status === "closed").length;

    setStats({
      total: userTickets.length,
      open: openTickets,
      inProgress,
      closed: closedTickets,
      deleted: deletedUserTickets.length,
    });
  }, [username]);

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  const handleCardClick = (status) => {
    if (status === "total") navigate("/tickets");
    else if (status === "deleted") setDeletedModal(deletedTickets);
    else navigate(`/tickets?status=${status}`);
  };

  const handleRestore = (ticket) => {
    let allTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = allTickets.map((t) =>
      t.id === ticket.id ? { ...t, deleted: false } : t
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setDeletedModal(null);
    window.location.reload(); // refresh stats
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dash-header">
          <div className="user-info">
            <div className="avatar">{username.charAt(0).toUpperCase()}</div>
            <h2>Welcome, {username} 👋</h2>
          </div>
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
          <div className="stat-card deleted" onClick={() => handleCardClick("deleted")}>
            <h3>Deleted Tickets</h3>
            <p>{stats.deleted}</p>
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

      {/* Deleted Tickets Modal */}
      {deletedModal && (
        <div className="modal-overlay" onClick={() => setDeletedModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Deleted Tickets</h3>
            {deletedModal.length === 0 ? (
              <p>No deleted tickets.</p>
            ) : (
              deletedModal.map((ticket) => (
                <div key={ticket.id} className="deleted-ticket-card">
                  <h4>{ticket.title}</h4>
                  <p>{ticket.description}</p>
                  <p>Status: {ticket.status}</p>
                  <button
                    className="restore-btn"
                    onClick={() => handleRestore(ticket)}
                  >
                    Restore
                  </button>
                </div>
              ))
            )}
            <button className="cancel-btn" onClick={() => setDeletedModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 SwiftTickets. All rights reserved ❤️ by Wisdom</p>
      </footer>
    </>
  );
}

export default Dashboard;







