
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RequestsCard = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "admin" && user?.id === "super-admin";

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {isSuperAdmin 
            ? "All Community Requests & Complaints" 
            : "Resident Requests & Complaints"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          {isSuperAdmin 
            ? "No pending community requests or issues to display"
            : "No pending resident requests"}
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsCard;
