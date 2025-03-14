
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const MaintenanceCard = () => {
  return (
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
  );
};

export default MaintenanceCard;
