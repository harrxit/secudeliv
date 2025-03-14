
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, UserPlus } from "lucide-react";

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
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">Secudeliv</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name} ({user.apartment})
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
                {!isRegisterPage && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/register")}
                    className="flex items-center gap-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                )}

                {!isLoginPage && !location.pathname.includes("dashboard") && (
                  <Button 
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-1"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
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
