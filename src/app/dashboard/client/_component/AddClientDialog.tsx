import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";
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
import {useCreateClient} from "@/service/AddClient"
import { toast } from "sonner";



const formSchema = z.object({
  First_Name: z.string().min(1, "First name is required"),
  Last_Name: z.string().min(1, "Last name is required"),
  PAN: z.string()
    .length(10, "PAN must be exactly 10 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  Mobile_Number: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  City: z.string().min(1, "City is required"),
  State: z.string().min(1, "State is required"),
  Pincode: z.string()
    .length(6, "Pincode must be exactly 6 digits"),
  Address_1: z.string().min(1, "Address is required"),
  Alternate_Mobile_Number: z
    .string()
    .optional()
    .nullable(),
  Address_2: z.string().optional(),
  Aadhaar: z
    .string()
    .optional(),
  sendMailToClient: z.boolean(),
});

const AddClientDialog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      First_Name : "",
      Last_Name : "",
      PAN : "",
      email : "",
      gender : "Male",
      Mobile_Number : "",
      City : "",
      State: " ",
      Pincode : " ",
      Alternate_Mobile_Number : "", // optional
      Address_1 : "",   // optional
      Address_2 : "",  // optional
      Aadhaar : "", // optional
      sendMailToClient : true
  }
  });

  const { isValid } = useFormState({
    control: form.control
  })

  const mutation = useCreateClient({
    onSuccess: (data: any) => {
      console.log("Form submitted successfully:", data);
      toast.success("Client Added Successfully")
    },
    onError: (error: any) => {
      console.error("Error submitting form:", error);
      toast.error("Failed in Adding Client")
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    mutation.mutate(
      {
        First_Name: formData.First_Name,
        Last_Name: formData.Last_Name,
        PAN: formData.PAN,
        email: formData.email,
        gender: formData.gender,
        Mobile_Number: formData.Mobile_Number,
        City: formData.City,
        State: formData.State,
        Pincode: formData.Pincode,
        Address_1: formData.Address_1,
        Alternate_Mobile_Number: formData.Alternate_Mobile_Number || "",
        Address_2: formData.Address_2 || "",
        Aadhaar: formData.Aadhaar || "",
        sendMailToClient: formData.sendMailToClient,
      }
    );
  }

  const states = [
    "Andhra Pradesh",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    // Add more states as needed
  ];

  return (
    <DialogContent>
      <DialogHeader className="items-center">
        <DialogTitle>Create New Client</DialogTitle>
        <DialogDescription className="text-[#F21300]">
          Fill all the information correctly to avoid duplicacy
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="PAN"
            render={({ field }) => (
              <div>
                <FormLabel>
                  PAN<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="10 Digit PAN" {...field} />
                </FormControl>
                <FormMessage/>
              </div>
            )}
          />

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
                <FormMessage/>
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
                </FormItem>
              )}
            />
          </div>

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              </FormItem>
            )}
          />

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
                    <Input placeholder="Pincode" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sendMailToClient"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-2">
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
