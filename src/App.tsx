
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RequestProvider } from "./contexts/RequestContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin"; 
import Register from "./pages/Register";
import SuperAdminRegister from "./pages/SuperAdminRegister";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RequestProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="admin-login" element={<AdminLogin />} />
                <Route path="register" element={<Register />} />
                <Route path="super-admin-register" element={<SuperAdminRegister />} />
                <Route path="user-dashboard" element={<UserDashboard />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RequestProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
