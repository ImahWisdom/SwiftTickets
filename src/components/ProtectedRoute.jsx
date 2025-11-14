import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));

  if (!session || !session.username) {
    // Not logged in, redirect to login page
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in, render the child component
  return children;
};

export default ProtectedRoute;
