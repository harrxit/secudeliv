
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserType } from "@/types";
import TenantFields from "./TenantFields";

// Form schema definition
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  apartment: z.string().min(1, {
    message: "Apartment number is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  userType: z.enum(["owner", "tenant"], {
    required_error: "Please select if you are an owner or tenant.",
  }),
  ownerName: z.string().optional(),
  ownerContact: z.string().optional(),
}).refine((data) => {
  if (data.userType === "tenant") {
    return !!data.ownerName && !!data.ownerContact;
  }
  return true;
}, {
  message: "Owner details are required for tenants",
  path: ["ownerName"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<UserType>("owner");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      apartment: "",
      email: "",
      password: "",
      phone: "",
      userType: "owner",
      ownerName: "",
      ownerContact: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    try {
      registerUser({
        name: values.name,
        apartment: values.apartment,
        email: values.email,
        password: values.password,
        phone: values.phone,
        userType: values.userType,
        ownerName: values.userType === "tenant" ? values.ownerName : undefined,
        ownerContact: values.userType === "tenant" ? values.ownerContact : undefined,
      });

      toast({
        title: "Registration Successful",
        description:
          "Your registration has been submitted and is pending approval by security admin.",
      });

      // Redirect to index page after successful registration
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment Number</FormLabel>
              <FormControl>
                <Input placeholder="A-101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you the Owner or Tenant?</FormLabel>
              <Select 
                onValueChange={(value: UserType) => {
                  field.onChange(value);
                  setUserType(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {userType === "tenant" && <TenantFields control={form.control} />}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
