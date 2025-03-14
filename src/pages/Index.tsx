
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return user.role === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/user-dashboard" replace />
    );
  }

  return <Navigate to="/" replace />;
};

export default Index;
