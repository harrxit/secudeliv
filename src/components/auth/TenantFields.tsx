
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TenantFieldsProps {
  control: Control<any>;
}

const TenantFields = ({ control }: TenantFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="ownerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Owner's Name</FormLabel>
            <FormControl>
              <Input placeholder="Owner's full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="ownerContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Owner's Contact Number</FormLabel>
            <FormControl>
              <Input placeholder="Owner's phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TenantFields;
