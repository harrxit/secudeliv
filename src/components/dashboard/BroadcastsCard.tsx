
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const BroadcastsCard = () => {
  return (
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
  );
};

export default BroadcastsCard;
