
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, UserPlus, Lock, Home, Info, Phone } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show login/register buttons on those pages
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="bg-white shadow-sm border-b animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">Secudeliv</span>
            </Link>
            
            {/* Basic navbar components */}
            <div className="hidden md:flex items-center ml-6 space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name} ({user.apartment}) - {user.userType || 'Resident'}
                </span>
                {user.role === "admin" ? (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin-dashboard")}
                  >
                    Admin Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/user-dashboard")}
                  >
                    My Dashboard
                  </Button>
                )}
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
              <>
                {!isRegisterPage && !isLoginPage && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Resident Login</span>
                  </Button>
                )}

                {!isLoginPage && !location.pathname.includes("dashboard") && (
                  <Button 
                    onClick={() => navigate("/admin-login")}
                    className="flex items-center gap-1"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
