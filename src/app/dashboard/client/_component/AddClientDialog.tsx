"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MaterialInput } from "@/components/material-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddClient } from "@/hooks/clients/manage-client";
import { AxiosError } from "axios";

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
];

const AddClientFormSchema = z.object({
  PAN: z
    .string()
    .min(1, "PAN is required")
    .transform((value) => value.toUpperCase())
    .refine((value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value), {
      message: "Invalid PAN format",
    }), // Transform to uppercase
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
  gender: z.enum(["Male", "Female", "Other"]),

  sendMailToClient: z.boolean().default(false),
});

type AddClientFormValues = z.infer<typeof AddClientFormSchema>;

interface AddClientDialogProps {
  onClose: () => void;
}

export default function AddClientDialog({ onClose }: AddClientDialogProps) {
  const { mutate: addUser } = useAddClient();
  const queryClient = useQueryClient();

  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(AddClientFormSchema),
    defaultValues: {
      First_Name: "",
      Last_Name: "",
      PAN: "",
      email: "",
      gender: undefined,
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

  function onSubmit(data: AddClientFormValues) {
    addUser(data, {
      onSuccess: () => {
        toast.success("Client created successfully!");
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        onClose();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          toast.error(`Error: ${errorMessage}`);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  }

  return (
    <div className="max-w-[400px] w-full px-2 py-2">
      <div>
        <div className="relative flex items-center justify-between px-4 ">
          <div className="flex-1 text-center">
            <h2 className="text-[20px] font-bold text-black">
              Create New Client
            </h2>
            <p className="text-[#f21300] text-[13px] font-medium leading-none">
              Fill all the information correctly to avoid duplicacy.
            </p>
          </div>
          <div
            className="absolute text-[#f21300] top-0 right-0 cursor-pointer"
            onClick={onClose}
          >
            <X className="" size={"16"} strokeWidth={"5"} />
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-3">
          <FormField
            control={form.control}
            name="PAN"
            render={({ field, fieldState: { error } }) => (
              <div>
                <FormControl>
                  <MaterialInput
                    placeholder="PAN"
                    {...field}
                    className={`${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="First_Name"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="First Name"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Name"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="Last Name"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <div>
                <FormControl>
                  <MaterialInput
                    placeholder="Email"
                    {...field}
                    className={`${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Mobile_Number"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="Mobile Number"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Aadhaar"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="Adhaar Number"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="Address_1"
            render={({ field, fieldState: { error } }) => (
              <div>
                <FormControl>
                  <MaterialInput
                    placeholder="Address-1"
                    {...field}
                    className={`${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="Address_2"
            render={({ field, fieldState: { error } }) => (
              <div>
                <FormControl>
                  <MaterialInput
                    placeholder="Address-2"
                    {...field}
                    className={`${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="State"
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    >
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
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="City"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="City"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Pincode"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="PinCode"
                      {...field}
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormLabel className="text-[11px] py-0 placeholder:text-[13px] text-[#091747] font-medium">
                    Send Login mail to Client?
                  </FormLabel>
                </div>
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#F21300] hover:bg-[#d11100] text-white"
          >
            Create Client
          </Button>
        </form>
      </Form>
    </div>
  );
}
