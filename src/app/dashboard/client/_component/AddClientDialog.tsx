import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddClient } from "@/hooks/clients/manage-client";
import { toast } from "sonner";
import { AddClientformSchema } from "../_types/zodSchema";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { MaterialInput } from "@/components/material-input";

// Validation schema

// States array
const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
];

interface onCloseProp {
  onClose: () => void;
}

const AddClientDialog = ({ onClose }: onCloseProp) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addUser } = useAddClient();

  const form = useForm<z.infer<typeof AddClientformSchema>>({
    resolver: zodResolver(AddClientformSchema),
    defaultValues: {
      First_Name: "",
      Last_Name: "",
      PAN: "",
      email: "",
      gender: "Male",
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

  const queryClient = useQueryClient();

  async function onSubmit(formData: z.infer<typeof AddClientformSchema>) {
    // const jsonData = JSON.stringify(formData, null, 2);
    addUser(formData, {
      onSuccess: () => {
        toast.success("Client created successfully!");

        // Invalidate queries to refetch the updated list of clients
        queryClient.invalidateQueries({ queryKey: ["clients"] });

        form.reset();
      },
      onError: (error) => {
        toast.error(`Failed to create client: ${error.message}`);
      },
      onSettled: () => setIsSubmitting(false),
    });
  }

  return (
    <div className="px-2 py-2">
      <div className="items-center">
        <div className="flex items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#091747]">
              Create New Client
            </h2>
            <p className="text-[#f21300] text-sm mt-1">
              Fill all the information correctly to avoid duplicacy.
            </p>
          </div>
          <button className="text-[#f21300]" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="PAN"
            render={({ field }) => (
              <div>
                <FormControl>
                  <MaterialInput placeholder="PAN" {...field} className="border-[#091747] text-[14px]"/>
                </FormControl>
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="First_Name"
              render={({ field }) => (
                <div>
                  <MaterialInput {...field} placeholder="First Name" readOnly className="border-[#091747] text-[14px]"/>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Name"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="Last Name"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                   {/* <FormMessage /> */}
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormControl>
                  <MaterialInput placeholder="Email" {...field} className="border-[#091747] text-[14px]"/>
                </FormControl>
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Mobile_Number"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="Mobile Number" {...field} className="border-[#091747] text-[14px]"/>
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Aadhaar"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="Aadhaar Number" {...field} className="border-[#091747] text-[14px]"/>
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="Address_1"
            render={({ field }) => (
              <div>
                <FormControl>
                  <MaterialInput placeholder="Address-1" {...field} className="border-[#091747] text-[14px]"/>
                </FormControl>
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="Address_2"
            render={({ field }) => (
              <div>
                <FormControl>
                  <MaterialInput placeholder="Address-2" {...field} className="border-[#091747] text-[14px]"/>
                </FormControl>
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="State"
            render={({ field }) => (
              <div>
                 <label className="text-[11px] font-semibold text-[#091747]">State</label>
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
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <div>
                 <label className="text-[11px] font-semibold text-[#091747] text-left">Gender</label>
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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {/* <FormMessage /> */}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="City"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="City" {...field} className="border-[#091747] text-[14px]"/>
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Pincode"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      type="text"
                      placeholder="Pincode"
                      {...field}
                      className="border-[#091747] text-[14px]" // Use string value directly
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sendMailToClient"
            render={({ field }) => (
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                <label className="text-[14px] text-[#091747] font-medium">Send Login mail to Client?</label>
                </div>
              </div>
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
            // onClick={onSave}
          >
            {isSubmitting ? "Creating..." : "Create Client"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddClientDialog;
