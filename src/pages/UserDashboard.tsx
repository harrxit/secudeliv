
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AccessRequest, DeliveryType } from "@/types";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  // Redirect if not logged in as user
  if (!user || user.role !== "user") {
    navigate("/");
    return null;
  }

  const handleRequestAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: AccessRequest = {
      id: Date.now().toString(),
      userId: user.id,
      deliveryPlatform: formData.get("platform") as string,
      deliveryPersonName: formData.get("name") as string,
      deliveryType: formData.get("type") as DeliveryType,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRequests([newRequest, ...requests]);
    setIsDialogOpen(false);
    toast({
      title: "Access Request Created",
      description: "Your request has been sent to security for approval.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-success";
      case "rejected":
        return "text-danger";
      default:
        return "text-warning";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-danger" />;
      default:
        return <Clock className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">Apartment: {user.apartment}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Package className="mr-2 h-5 w-5" />
              Request Delivery Access
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Delivery Access Request</DialogTitle>
              <DialogDescription>
                Fill in the delivery details to create a temporary access request
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestAccess}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Delivery Platform</label>
                  <Input
                    name="platform"
                    placeholder="e.g., Swiggy, Amazon"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label>Delivery Person Name</label>
                  <Input
                    name="name"
                    placeholder="Enter delivery person name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label>Delivery Type</label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="courier">Courier</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Access Requests</CardTitle>
            <CardDescription>
              Track the status of your delivery access requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No access requests yet
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <p className="font-medium">
                          {request.deliveryPlatform} - {request.deliveryPersonName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Type: {request.deliveryType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
