import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaStar, FaCalendarAlt } from "react-icons/fa";
import "./Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "Low",
  });
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filterStatus = query.get("status");

  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  const username = session?.username;

  useEffect(() => {
    let allTickets = [];
    try {
      const rawTickets = localStorage.getItem("tickets");
      allTickets = JSON.parse(rawTickets) || [];
      if (!Array.isArray(allTickets)) allTickets = [];
    } catch (err) {
      allTickets = [];
    }
    setTickets(allTickets.filter((t) => t.username === username));
  }, [username]);

  const saveTickets = (updatedTickets) => {
    let allTickets = [];
    try {
      const rawTickets = localStorage.getItem("tickets");
      allTickets = JSON.parse(rawTickets) || [];
      if (!Array.isArray(allTickets)) allTickets = [];
    } catch (err) {
      allTickets = [];
    }
    const otherUsers = allTickets.filter((t) => t.username !== username);
    localStorage.setItem(
      "tickets",
      JSON.stringify([...otherUsers, ...updatedTickets])
    );
    setTickets(updatedTickets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedTickets = tickets.map((t) =>
        t.id === editingId
          ? { ...formData, id: editingId, username, date: t.date }
          : t
      );
      saveTickets(updatedTickets);
      setEditingId(null);
    } else {
      const newTicket = {
        ...formData,
        id: Date.now(),
        username,
        date: new Date().toLocaleDateString(),
      };
      saveTickets([...tickets, newTicket]);
    }
    setModalOpen(false);
    setFormData({ title: "", description: "", status: "open", priority: "Low" });
  };

  const handleEdit = (id) => {
    const ticketToEdit = tickets.find((t) => t.id === id);
    setFormData(ticketToEdit);
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirmDelete) return;

    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, deleted: true } : t
    );
    saveTickets(updatedTickets);
  };

  const filteredTickets = filterStatus
    ? tickets.filter((t) => t.status === filterStatus && !t.deleted)
    : tickets.filter((t) => !t.deleted);

  return (
    <>
      <div className="tickets-container">
        <h2>Tickets</h2>
        <div className="button-group">
          <button className="create-btn" onClick={() => setModalOpen(true)}>
            {editingId ? "Edit Ticket" : "Create Ticket"}
          </button>
          <button
            className="go-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        <div className="tickets-grid">
          {filteredTickets.length === 0 ? (
            <p className="no-tickets">No tickets yet. Create one to get started!</p>
          ) : (
            filteredTickets.map((ticket) => (
              <div className={`ticket-card ${ticket.status}`} key={ticket.id}>
                <h3>{ticket.title}</h3>
                <p className="desc">{ticket.description}</p>
                <div className="details">
                  <span className={`chip status ${ticket.status}`}>
                    <FaTicketAlt /> {ticket.status.replace("_", " ")}
                  </span>
                  <span className={`chip priority ${ticket.priority.toLowerCase()}`}>
                    <FaStar /> {ticket.priority}
                  </span>
                  <span className="chip date">
                    <FaCalendarAlt /> {ticket.date}
                  </span>
                </div>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(ticket.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(ticket.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editingId ? "Edit Ticket" : "Create Ticket"}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  maxLength={50}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  maxLength={200}
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 SwiftTickets. All rights reserved ❤️ by Wisdom</p>
      </footer>
    </>
  );
}

export default Tickets;






