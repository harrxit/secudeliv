
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    login("admin");
    navigate("/admin-dashboard");
  };

  return (
    <nav className="bg-white shadow-sm border-b animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">SafeEntry Guard</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name} ({user.apartment})
                </span>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </div>
            )}
            {user?.role !== "admin" && (
              <Button 
                variant="outline" 
                className="bg-amber-50 hover:bg-amber-100 border-amber-200"
                onClick={handleAdminLogin}
              >
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
