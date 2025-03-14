
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRequests } from "@/contexts/RequestContext";
import {
  Card,
  CardContent,
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

const DeliveryCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { requests, addRequest } = useRequests();

  // Filter requests to only show those belonging to the current user
  const userRequests = requests.filter(request => request.userId === user!.id);

  const handleRequestAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: AccessRequest = {
      id: Date.now().toString(),
      userId: user!.id,
      deliveryPlatform: formData.get("platform") as string,
      deliveryPersonName: formData.get("name") as string,
      deliveryType: formData.get("type") as DeliveryType,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addRequest(newRequest);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Delivery Intimation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
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

        <div className="mt-6 space-y-4">
          <p className="font-medium mb-2">Recent Requests</p>
          {userRequests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No access requests yet
            </div>
          ) : (
            <div className="space-y-4">
              {userRequests.map((request) => (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
