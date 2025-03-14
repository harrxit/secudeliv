
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRequests } from "@/contexts/RequestContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Home,
  Wrench,
  Bell,
  PartyPopper,
  User,
  DollarSign,
  MessageSquare,
  Tool,
  PanelLeftOpen,
  Phone,
  Mail
} from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { requests, addRequest } = useRequests();

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

    addRequest(newRequest);
    setIsDialogOpen(false);
    toast({
      title: "Access Request Created",
      description: "Your request has been sent to security for approval.",
    });
  };

  // Filter requests to only show those belonging to the current user
  const userRequests = requests.filter(request => request.userId === user.id);

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Apartment:</span>
                    <span>{user.apartment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Resident Type:</span>
                    <span>{user.userType}</span>
                  </div>
                  {user.userType === 'tenant' && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">Owner Name:</span>
                        <span>{user.ownerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Owner Contact:</span>
                        <span>{user.ownerContact}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Maintenance Charges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-2xl font-bold text-success">₹0.00</p>
                  <p className="text-gray-500 mt-2">No pending payments</p>
                  <Button variant="outline" className="mt-6">View Payment History</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Resident Requests & Complaints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  No pending resident requests
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab Content */}
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tool className="h-5 w-5" />
                  Service Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Request Cleaning Service</Button>
                  <Button className="w-full">Request Plumber</Button>
                  <Button className="w-full">Request Electrician</Button>
                  <Button className="w-full" variant="outline">Other Services</Button>
                </div>
                <div className="mt-6">
                  <p className="font-medium mb-2">Recent Service Requests</p>
                  <div className="text-center py-4 text-gray-500">
                    No service requests yet
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Broadcasts Tab Content */}
        <TabsContent value="broadcasts">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notices & Broadcasts
                </CardTitle>
                <CardDescription>
                  Important announcements from management and residents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button>Create New Notice</Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Water Supply Interruption</h3>
                        <p className="text-sm text-gray-500">Posted by: Management</p>
                      </div>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-gray-700">Water supply will be interrupted on Sunday between 10 AM and 2 PM due to maintenance work.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Unauthorized Parking Notice</h3>
                        <p className="text-sm text-gray-500">Posted by: Management</p>
                      </div>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700">Kindly ensure that all vehicles are parked in designated areas only. Unauthorized parking will result in penalties.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Celebrations Tab Content */}
        <TabsContent value="celebrations">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5" />
                  Celebrations & Invitations
                </CardTitle>
                <CardDescription>
                  Create and manage invitations for your events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button>Create New Invitation</Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Building A Housewarming</h3>
                        <p className="text-sm text-gray-500">Hosted by: John Doe (A-101)</p>
                      </div>
                      <span className="text-sm text-gray-500">Next Saturday, 6 PM</span>
                    </div>
                    <p className="text-gray-700 mb-4">You are cordially invited to our housewarming ceremony. Please join us for dinner and celebrations.</p>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">Accept</Button>
                      <Button variant="outline" size="sm">Decline</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
