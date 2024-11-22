import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddClient } from "@/hooks/users/manage-client";
import { toast } from "sonner";

const panZodSchema = z
    .string()
    .min(1, "PAN is required")
    .transform((value) => value.toUpperCase())
    .refine(
    (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value),
    { message: "Invalid PAN format" }
)

// Validation schema
const formSchema = z.object({
  PAN: panZodSchema, // Transform to uppercase
  First_Name: z.string().min(1, "First name is required"), // Ensures the field is not empty
  Last_Name: z.string().min(1, "Last name is required"),
  Mobile_Number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number") // Validates 10-digit Indian mobile numbers starting with 6-9
    .min(1, "Mobile number is required"),
  email: z
    .string()
    .email("Invalid email address") // Validates email format
    .min(1, "Email is required"),
  Address_1: z.string().min(1, "Address 1 is required"),
  City: z.string().min(1, "City is required"),
  State: z.string().min(1, "State is required"),
  Pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode") // Validates 6-digit Indian postal codes
    .min(1, "Pincode is required"),
 
  // Optional fields
  Alternate_Mobile_Number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid alternate mobile number") // Validates 10-digit Indian mobile numbers starting with 6-9
    .optional()
    .or(z.literal("")),
  Address_2: z.string().optional(),
  Aadhaar: z
    .string()
    .regex(/^\d{12}$/, "Invalid Aadhaar number") // Validates 12-digit Aadhaar numbers
    .optional()
    .or(z.literal("")),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  loginStatus : z.enum(["None", "Active", "Inactive"]).optional(),
  kycStatus : z.enum(["Approved", "Pending"]).optional(),
 
  //optional
  dscStatus : z.enum(["None","Not_Applicable", "With_Vakilgiri", "With_Client"]).optional(),
  dscExpiry : z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD")
  .refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid date" })
  .transform((date) => new Date(date)).optional(),
  dscVault : z.string().optional(),
  // Boolean field for sending email to client, with a default value of `false`
  sendMailToClient: z.boolean().default(false),
});

// States array
const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
];

const AddClientDialog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addUser } = useAddClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      First_Name: "",
      Last_Name: "",
      PAN: "",
      email: "",
      // gender: "male",
      Mobile_Number: "",
      City: "",
      State: "",
      Pincode: "",
      Alternate_Mobile_Number: "",
      Address_1: "",
      Address_2: "",
      Aadhaar: "",
      sendMailToClient: true,
    },
  });

  const { isValid } = useFormState({
    control: form.control,
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    
    const jsonData = JSON.stringify(formData, null, 2);
    console.log("Form Data:", formData);
    console.log("Form Data:", jsonData);
    addUser(formData, {
      onSuccess: () => {
        toast.success("Client created successfully!");
        form.reset();
      },
      onError: (error) => {
        toast.error(`Failed to create client: ${error.message}`);
      },
      onSettled: () => setIsSubmitting(false),
    });
  }

  return (
    <DialogContent>
      <DialogHeader className="items-center">
        <DialogTitle>Create New Client</DialogTitle>
        <DialogDescription className="text-[#F21300]">
          Fill all the information correctly to avoid duplicacy
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="First_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="PAN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  PAN<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="10 Digit PAN" {...field} />
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
                <FormLabel>
                  Email ID<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Mobile_Number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mobile Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Mobile No." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Aadhaar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Aadhaar Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="Address_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address-1<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Address-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Address_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address-2</FormLabel>
                <FormControl>
                  <Input placeholder="Address-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="State"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  State<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gender<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    City<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Pincode"
                      {...field} // Use string value directly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sendMailToClient"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Send Login mail to Client?</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full ${
              isValid
                ? "bg-[#F21300] hover:bg-[#d11100]"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Client"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddClientDialog;
