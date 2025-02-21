
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
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Filter,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [filter, setFilter] = useState<RequestStatus>("pending");

  // Redirect if not logged in as admin
  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleNewRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: AccessRequest = {
      id: Date.now().toString(),
      userId: "user-1", // In a real app, this would be the actual user's ID
      deliveryPlatform: formData.get("platform") as string,
      deliveryPersonName: formData.get("name") as string,
      deliveryType: formData.get("type") as DeliveryType,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      initiatedByAdmin: true,
      deliveryPersonImage: "", // In a real app, this would be handled by file upload
    };

    setRequests([newRequest, ...requests]);
    setIsDialogOpen(false);
    toast({
      title: "Request Created",
      description: "The request has been sent to the resident for approval.",
    });
  };

  const handleStatusUpdate = (requestId: string, newStatus: RequestStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? { ...request, status: newStatus, updatedAt: new Date().toISOString() }
          : request
      )
    );
    toast({
      title: `Request ${newStatus}`,
      description: `The access request has been ${newStatus}.`,
    });
  };

  const filteredRequests = requests.filter(
    (request) => filter === "all" || request.status === filter
  );

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-gray-600">Manage delivery access requests</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <UserPlus className="mr-2 h-5 w-5" />
              Create Access Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Access Request</DialogTitle>
              <DialogDescription>
                Create a new access request for an unregistered delivery
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewRequest}>
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
                {/* In a real app, add image upload functionality here */}
              </div>
              <DialogFooter>
                <Button type="submit">Create Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Access Requests</CardTitle>
                <CardDescription>
                  Manage and track all delivery access requests
                </CardDescription>
              </div>
              <Select
                value={filter}
                onValueChange={(value) =>
                  setFilter(value as RequestStatus | "all")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No access requests found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Package className="h-5 w-5 text-gray-600" />
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
                      {request.status === "pending" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-success border-success hover:bg-success hover:text-white"
                            onClick={() =>
                              handleStatusUpdate(request.id, "approved")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-danger border-danger hover:bg-danger hover:text-white"
                            onClick={() =>
                              handleStatusUpdate(request.id, "rejected")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            request.status === "approved"
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      )}
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

export default AdminDashboard;
