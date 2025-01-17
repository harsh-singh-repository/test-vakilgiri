"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  //   FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";

// import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userRegisterByRoleSchema } from "../_types/zodSchema";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { MaterialInput } from "@/components/material-input";
import CustomSelect from "@/components/custom-select";
import { AxiosError } from "axios";
import { useAddStaffRoles } from "@/hooks/user/manage-user";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";

const states = [
  { key: "Arunachal_Pradesh", name: "Arunachal Pradesh" },
  { key: "Andhra_Pradesh", name: "Andhra Pradesh" },
  { key: "Chhattisgarh", name: "Chhattisgarh" },
  { key: "Assam", name: "Assam" },
  { key: "Bihar", name: "Bihar" },
  { key: "Haryana", name: "Haryana" },
  { key: "Goa", name: "Goa" },
  { key: "Rajasthan", name: "Rajasthan" },
  { key: "Uttar_Pradesh", name: "Uttar Pradesh" },
  { key: "Tamil_Nadu", name: "Tamil Nadu" },
  { key: "Others", name: "Others" },
];

const gender = [
  { key: "Male", name: "Male" },
  { key: "Female", name: "Female" },
  { key: "Other", name: "Other" },
];

const loginStatus = [
  { key: "None", name: "None" },
  { key: "Active", name: "Active" },
  { key: "Inactive", name: "Inactive" },
];

const role = [
  { key: "Admin", name: "Admin" },
  { key: "Staff_Manager", name: "Staff" },
  { key: "Client", name: "Client" },
  { key: "Mediator", name: "Mediator" },
  { key: "Professional", name: "Professional" },
  { key: "Retailer", name: "Retailer" },
];
// const bussinessType = [
//   { key: "Private_Limited", name: "Private Limited" },
//   { key: "Proprietorship", name: "Proprietorship" },
//   { key: "Partnership_Firm", name: "Partnership Firm" },
//   { key: "LLP", name: "LLP" },
//   { key: "Public_Limited", name: "Public Limited" },
//   { key: "Micro_Finance", name: "Micro Finance" },
//   { key: "Trust", name: "Trust" },
//   { key: "Society", name: "Society" },
//   { key: "Section_Eight", name: "Section Eight" },
//   { key: "Producer_Limited", name: "Producer Limited" },
//   { key: "OPC", name: "OPC" },
//   { key: "Nidhi_Limited", name: "Nidhi Limited" },
// ];

interface onCloseProp {
  onClose: () => void;
}

const CreateStaff = ({ onClose }: onCloseProp) => {
  // const [date, setDate] = React.useState<Date>();
  //   const [logo, setLogo] = React.useState<string | null>(null);

  const queryClient = useQueryClient();

  const [loader, setLoader] = useState(false);

  const { mutate: addStaffRoles } = useAddStaffRoles();

  const form = useForm<z.infer<typeof userRegisterByRoleSchema>>({
    resolver: zodResolver(userRegisterByRoleSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      pan: "",
      dob: "",
      aadhaar: "",
      gender: "Male",
      state: "Arunachal_Pradesh",
      city: "",
      address1: "",
      address2: "",
      pincode: "",
      userRoles: "Staff_Manager",
      loginStatus: "Active",
    },
  });

  const onSubmit = (data: z.infer<typeof userRegisterByRoleSchema>) => {
    console.log("formdata", data);
    setLoader(true);
    addStaffRoles(data, {
      onSuccess: () => {
        setLoader(false);
        toast.success("Role add to Staff.");
        queryClient.invalidateQueries({ queryKey: ["userStaff"] });
      },
      onError: (error) => {
        setLoader(false);
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Add role: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setLogo(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  return (
    <div className="">
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-center">
          <div className="text-[#091747] text-[22px] font-semibold text-center">
            Add Staff
          </div>
        </div>
        <span className="inline text-[14px] bg-[#091747] text-left px-2 py-1 font-medium rounded-full max-w-fit text-white">
          Personal Details
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <FormField
              name="pan"
              control={form.control}
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      placeholder="PAN"
                      {...field}
                      className="w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <div>
                  {/* <FormLabel className="text-xs">Business Name</FormLabel> */}
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="First Name"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <div>
                    {/* <FormLabel className="text-xs">Business Name</FormLabel> */}
                    <FormControl>
                      <MaterialInput
                        {...field}
                        className="text-xs"
                        placeholder="Last Name"
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
              render={({ field }) => (
                <div>
                  {/* <FormLabel className="text-xs">PAN Card</FormLabel> */}
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="Email ID"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <CustomSelect
                      {...field}
                      className="w-full"
                      placeholder="Gender"
                      options={gender}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="Mobile Number"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field}) => (
                <div>
                  <CustomDatePicker
                  value={field.value || ""}
                  onChange={(date) =>
                    field.onChange(
                      date ? format(new Date(date), "yyyy-MM-dd") : ""
                    )
                  }
                />
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="userRoles"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <CustomSelect
                      {...field}
                      className="w-full"
                      placeholder="Staff Role"
                      options={role}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="aadhaar"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="Adhaar"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="Address-1"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="Address 2"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="text-xs"
                      placeholder="City"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <CustomSelect
                      {...field}
                      className="w-full"
                      placeholder="State"
                      options={states}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput
                      {...field}
                      className="w-full"
                      placeholder="Pincode"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="loginStatus"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <CustomSelect
                      {...field}
                      className="w-full"
                      placeholder="Login Status"
                      options={loginStatus}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <FormField
              control={form.control}
              name="business_logo"
              render={() => (
                <div>
                  <FormLabel className="text-xs">File</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer h-24 hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="logo-upload"
                        onChange={handleLogoUpload}
                      />
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        {logo ? (
                          <img
                            src={logo}
                            alt="Business logo"
                            className="max-h-24 mx-auto"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            Upload Logo (1*1)
                          </div>
                        )}
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            /> */}
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-2">
            <div
              className="py-2 px-3 max-w-fit text-xs bg-[#091747] text-white rounded-md text-center cursor-pointer"
              onClick={onClose}
            >
              Close
            </div>
            <Button
              className="py-1 px-2 w-32 text-xs bg-[#F21300] hover:bg-[#091747] text-white "
              type="submit"
            >
              {loader ? "Loading...." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateStaff;
