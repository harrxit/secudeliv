
import { User } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
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
  );
};

export default ProfileCard;
