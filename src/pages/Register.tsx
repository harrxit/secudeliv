
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center animate-fadeIn">
      <div className="max-w-md w-full px-4">
        <RegisterHeader />

        <Card>
          <CardHeader>
            <CardTitle>Resident Registration</CardTitle>
            <CardDescription>
              Please fill out the form below to register. Your account will need
              to be approved by security admin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className="text-gray-500"
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
