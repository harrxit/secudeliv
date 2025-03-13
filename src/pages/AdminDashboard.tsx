
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AccessRequest, DeliveryType, RequestStatus, UserStatus } from "@/types";
import {
  Package,
  CheckCircle,
  XCircle,
  UserPlus,
  Filter,
  Search,
  MessageSquare,
  UserCheck,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, allUsers, pendingUsers, updateUserStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const { 
    requests, 
    addRequest, 
    updateRequestStatus,
    updateRequestComment,
  } = useRequests();
  const [filter, setFilter] = useState<RequestStatus | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("requests");

  // Redirect if not logged in as admin
  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleNewRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apartmentNumber = formData.get("apartment") as string;
    
    // Find the resident by apartment number
    const resident = allUsers.find(r => r.apartment === apartmentNumber && r.role === "user");
    
    if (!resident) {
      toast({
        title: "Error",
        description: "No resident found with this apartment number.",
        variant: "destructive"
      });
      return;
    }
    
    const newRequest: AccessRequest = {
      id: Date.now().toString(),
      userId: resident.id,
      deliveryPlatform: formData.get("platform") as string,
      deliveryPersonName: formData.get("name") as string,
      deliveryType: formData.get("type") as DeliveryType,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      initiatedByAdmin: true,
      deliveryPersonImage: "",
      comment: formData.get("comment") as string || "",
    };

    addRequest(newRequest);
    setIsRequestDialogOpen(false);
    toast({
      title: "Request Created",
      description: `The request has been sent to ${resident.name} (${resident.apartment}) for approval.`,
    });
  };

  const handleStatusUpdate = (requestId: string, newStatus: RequestStatus) => {
    updateRequestStatus(requestId, newStatus);
    toast({
      title: `Request ${newStatus}`,
      description: `The access request has been ${newStatus}.`,
    });
  };

  const handleUserStatusUpdate = (userId: string, newStatus: UserStatus) => {
    updateUserStatus(userId, newStatus);
    toast({
      title: `User Registration ${newStatus}`,
      description: `The user registration has been ${newStatus}.`,
    });
  };

  const handleOpenCommentDialog = (requestId: string) => {
    setActiveRequestId(requestId);
    const request = requests.find(r => r.id === requestId);
    if (request && request.comment) {
      setCommentText(request.comment);
    } else {
      setCommentText("");
    }
    setIsCommentDialogOpen(true);
  };

  const handleCommentSubmit = () => {
    if (activeRequestId) {
      updateRequestComment(activeRequestId, commentText);
      toast({
        title: "Comment Updated",
        description: "Your comment has been added to the request.",
      });
      setIsCommentDialogOpen(false);
    }
  };

  const filteredRequests = requests
    .filter((request) => filter === "all" || request.status === filter)
    .filter((request) => {
      const resident = allUsers.find((r) => r.id === request.userId);
      const searchLower = searchQuery.toLowerCase();
      return (
        !searchQuery ||
        resident?.apartment.toLowerCase().includes(searchLower) ||
        resident?.name.toLowerCase().includes(searchLower)
      );
    });

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-gray-600">Manage delivery access requests and resident accounts</p>
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
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
                  <label>Apartment Number</label>
                  <Input
                    name="apartment"
                    placeholder="e.g., A-101"
                    required
                    list="apartments"
                  />
                  <datalist id="apartments">
                    {allUsers
                      .filter(user => user.role === "user" && user.status === "approved")
                      .map((resident) => (
                        <option key={resident.id} value={resident.apartment}>
                          {resident.apartment} - {resident.name}
                        </option>
                      ))}
                  </datalist>
                </div>
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
                <div className="space-y-2">
                  <label>Comment (Optional)</label>
                  <Textarea 
                    name="comment"
                    placeholder="Add any additional information or instructions"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="requests">Access Requests</TabsTrigger>
          <TabsTrigger value="registrations">
            Pending Registrations
            {pendingUsers.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                {pendingUsers.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="residents">All Residents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:justify-between">
                <div>
                  <CardTitle>Access Requests</CardTitle>
                  <CardDescription>
                    Manage and track all delivery access requests
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      className="pl-9 w-full sm:w-[250px]"
                      placeholder="Search by apartment or resident"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={filter}
                    onValueChange={(value) =>
                      setFilter(value as RequestStatus | "all")
                    }
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
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
              </div>
            </CardHeader>
            <CardContent>
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No access requests found
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request) => {
                    const resident = allUsers.find(
                      (r) => r.id === request.userId
                    );
                    return (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Package className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">
                              {request.deliveryPlatform} -{" "}
                              {request.deliveryPersonName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Type: {request.deliveryType} |{" "}
                              {resident
                                ? `Resident: ${resident.name} (${resident.apartment})`
                                : "Unknown Resident"}
                            </p>
                            {request.comment && (
                              <p className="text-sm text-gray-600 mt-1 italic">
                                "{request.comment.substring(0, 50)}
                                {request.comment.length > 50 ? "..." : ""}"
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleOpenCommentDialog(request.id)}
                            title="Add Comment"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          
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
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                request.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </span>
                          )}
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Pending Resident Registrations</CardTitle>
              <CardDescription>
                Approve or reject new resident registration requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending registrations
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((pendingUser) => (
                    <div
                      key={pendingUser.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <UserCheck className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{pendingUser.name}</p>
                          <p className="text-sm text-gray-600">
                            Apartment: {pendingUser.apartment} | Email: {pendingUser.email} | Phone: {pendingUser.phone}
                          </p>
                          <p className="text-xs text-gray-500">
                            Registered: {new Date(pendingUser.registeredAt || "").toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-success border-success hover:bg-success hover:text-white"
                          onClick={() =>
                            handleUserStatusUpdate(pendingUser.id, "approved")
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
                            handleUserStatusUpdate(pendingUser.id, "rejected")
                          }
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="residents">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:justify-between">
                <div>
                  <CardTitle>All Residents</CardTitle>
                  <CardDescription>
                    View and manage all registered residents
                  </CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-9 w-full sm:w-[250px]"
                    placeholder="Search by name or apartment"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers
                  .filter((u) => u.role === "user")
                  .filter(
                    (u) =>
                      !searchQuery ||
                      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      u.apartment
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((resident) => (
                    <div
                      key={resident.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">
                            {resident.name}{" "}
                            <span
                              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                resident.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : resident.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {resident.status}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Apartment: {resident.apartment} | Email: {resident.email} | Phone: {resident.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment or Request Clarification</DialogTitle>
            <DialogDescription>
              Add a comment or request more information about this delivery request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter your comment or question..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCommentSubmit}>Save Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
