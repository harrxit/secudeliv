
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, User, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role: "user" | "admin") => {
    login(role);
    navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center animate-fadeIn">
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Welcome to SafeEntry Guard</h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure delivery management for your apartment complex
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <User className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Resident Login</h2>
          <p className="text-gray-600 mb-6">
            Manage delivery access requests and track your deliveries
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleLogin("user")}
          >
            Login as Resident
          </Button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Security Admin Login</h2>
          <p className="text-gray-600 mb-6">
            Manage access requests and maintain security protocols
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleLogin("admin")}
          >
            Login as Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
