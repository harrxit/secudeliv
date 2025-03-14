
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const ServicesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
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
  );
};

export default ServicesCard;
