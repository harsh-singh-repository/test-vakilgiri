"use client";

import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddBussinessformSchema } from "../_types/zodSchema";
import { useAddBusiness } from "@/hooks/business/manage-business";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { MaterialInput } from "@/components/material-input";
import CustomSelect from "@/components/custom-select";
import { AxiosError } from "axios";

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
  { key: "Others", name: "Others" }
];

const bussinessType = [
  { key: "Private_Limited", name: "Private Limited" },
  { key: "Proprietorship", name: "Proprietorship" },
  { key: "Partnership_Firm", name: "Partnership Firm" },
  { key: "LLP", name: "LLP" },
  { key: "Public_Limited", name: "Public Limited" },
  { key: "Micro_Finance", name: "Micro Finance" },
  { key: "Trust", name: "Trust" },
  { key: "Society", name: "Society" },
  { key: "Section_Eight", name: "Section Eight" },
  { key: "Producer_Limited", name: "Producer Limited" },
  { key: "OPC", name: "OPC" },
  { key: "Nidhi_Limited", name: "Nidhi Limited" },
];

interface onCloseProp {
  onClose: () => void;
}

const AddNewBussinessDialog = ({onClose}:onCloseProp) => {
  // const [date, setDate] = React.useState<Date>();
  const [logo, setLogo] = React.useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: addBussiness } = useAddBusiness();


  const form = useForm<z.infer<typeof AddBussinessformSchema>>({
    resolver: zodResolver(AddBussinessformSchema),
    defaultValues: {
      business_type: "Private_Limited",
      business_name: "",
      business_reg_date: "",
      business_pan: "",
      business_reg_no: "",
      business_mobile: "",
      business_address_1: "",
      business_address_2: "",
      business_logo: null,
      city: "",
      business_email: "",
      business_pincode: "",
      about: "",
      terms_conditions: false,
    },
  });

  const onSubmit = (data: z.infer<typeof AddBussinessformSchema>) => {
    console.log("formdata",data);
    addBussiness(data, {
      onSuccess: () => {
        toast.success("Bussiness Added Succesfully");
        queryClient.invalidateQueries({queryKey:['bussiness']})
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Add Busssiness: ${errorMessage}`);
        } else {
          // Handle non-Axios errors{
          toast.error(`An unexpected error occurred: ${error}`);
        }
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
      <div className="flex justify-between">
      <div className="flex flex-col">
        <div className="text-[#091747] text-[22px] font-semibold">
          Link Your Bussiness
        </div>
        <div className="text-[#F21300]">
          Please fill all the information correctly to get the most out of
          Vakilgiri.
        </div>
      </div>
      <X className="text-[#f21300] cursor-pointer" strokeWidth={"5"} onClick={onClose}/>
      </div>
      <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
        Basic Details
      </span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
            <FormField
              name="business_type"
              control={form.control}
              render={({ field }) => (
                <div>
                  <FormControl>
                     <CustomSelect placeholder="BussinessType" {...field} options={bussinessType} className="w-full" onValueChange={field.onChange}
                    value={field.value}/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <div>
                  {/* <FormLabel className="text-xs">Business Name</FormLabel> */}
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="Business Names"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <div>
              {/* <FormLabel className="text-xs">Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left text-xs font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
              <FormField
                control={form.control}
                name="business_reg_date"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left text-xs font-normal",
                              !field.value && "text-muted-foreground",
                              error &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500"
                            )}
                          >
                            <CalendarIcon
                              className="mr-2 h-4 w-4"
                              aria-hidden="true"
                            />
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a date"}
                          </Button>
                        </FormControl>

                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="business_pan"
              render={({ field }) => (
                <div>
                  {/* <FormLabel className="text-xs">PAN Card</FormLabel> */}
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="PAN Card"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_email"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="Official Email Id"/>
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
                      <CustomSelect {...field} className="w-full" placeholder="State" options={states} onValueChange={field.onChange} value={field.value}/>
                    </FormControl>

                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_address_2"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="Reg. Address-2"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_reg_no"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="CIN/ Reg. No."/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_mobile"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="Official Mobile"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_address_1"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="Reg. Address-1"/>
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
                    <MaterialInput {...field} className="text-xs" placeholder="City"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="business_pincode"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput {...field} className="text-xs" placeholder="PIN Code"/>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
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
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-xs">About the Bussiness</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-24" />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <FormField
              control={form.control}
              name="terms_conditions"
              render={({ field }) => (
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs">
                      By checking this you agree to our Terms & Conditions,
                      Privacy Policy, etc.
                    </FormLabel>
                  </div>
                </div>
              )}
            />
            <Button
              className="py-1 px-2 w-32 text-xs bg-[#F21300] hover:bg-[#091747] text-white"
              type="submit"
            >
              Save and Procced
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBussinessDialog;
