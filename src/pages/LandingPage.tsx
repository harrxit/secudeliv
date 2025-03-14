
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User, Home, Building, Users, CheckCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] animate-fadeIn">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Secudeliv
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your one stop solution for Neighbourhood management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="text-lg px-8"
            >
              Resident Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="text-lg px-8"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Neighbourhood Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<User className="h-10 w-10 text-primary" />}
              title="Resident Management"
              description="Easily manage resident profiles, access requests, and communications"
            />
            <FeatureCard
              icon={<Building className="h-10 w-10 text-primary" />}
              title="Delivery Control"
              description="Secure delivery management system for food, packages, and documents"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Visitor Tracking"
              description="Keep track of all visitors and maintain community security"
            />
            <FeatureCard
              icon={<Home className="h-10 w-10 text-primary" />}
              title="Property Management"
              description="Manage both owner and tenant relationships efficiently"
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-primary" />}
              title="Approval Workflows"
              description="Streamlined approval processes for community requests"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Enhanced Security"
              description="Maintain top-level security for your entire community"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Neighbourhood Management?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of communities that trust Secudeliv for their security and management needs.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="text-lg px-8"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
