
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRequests } from "@/contexts/RequestContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Home,
  Wrench,
  Bell,
  PartyPopper,
  User,
  DollarSign,
  MessageSquare,
  Settings,
  PanelLeftOpen,
  Phone,
  Mail
} from "lucide-react";

import ProfileCard from "@/components/dashboard/ProfileCard";
import MaintenanceCard from "@/components/dashboard/MaintenanceCard";
import RequestsCard from "@/components/dashboard/RequestsCard";
import DeliveryCard from "@/components/dashboard/DeliveryCard";
import ServicesCard from "@/components/dashboard/ServicesCard";
import BroadcastsCard from "@/components/dashboard/BroadcastsCard";
import CelebrationsCard from "@/components/dashboard/CelebrationsCard";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in as user
  if (!user || user.role !== "user") {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">
            Apartment: {user.apartment} | {user.userType === 'owner' ? 'Owner' : 'Tenant'}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">Sunshine Apartments</h2>
          <p className="text-gray-600">Building: {user.apartment.split('-')[0]}</p>
        </div>
      </div>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="broadcasts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Broadcasts</span>
          </TabsTrigger>
          <TabsTrigger value="celebrations" className="flex items-center gap-2">
            <PartyPopper className="h-4 w-4" />
            <span>Celebrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Home Tab Content */}
        <TabsContent value="home">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileCard user={user} />
            <MaintenanceCard />
            <RequestsCard />
          </div>
        </TabsContent>

        {/* Services Tab Content */}
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DeliveryCard />
            <ServicesCard />
          </div>
        </TabsContent>

        {/* Broadcasts Tab Content */}
        <TabsContent value="broadcasts">
          <BroadcastsCard />
        </TabsContent>

        {/* Celebrations Tab Content */}
        <TabsContent value="celebrations">
          <CelebrationsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
