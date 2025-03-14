
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";

const CelebrationsCard = () => {
  return (
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
  );
};

export default CelebrationsCard;
