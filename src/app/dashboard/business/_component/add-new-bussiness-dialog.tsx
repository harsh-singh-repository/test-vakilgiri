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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddBussinessformSchema } from "../_types/zodSchema";
import { useAddBusiness } from "@/hooks/business/manage-business";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

interface AddNewBussinessDialogProp{
  style?:string
}

const AddNewBussinessDialog = ({style}:AddNewBussinessDialogProp) => {
  // const [date, setDate] = React.useState<Date>();
  // const [logo, setLogo] = React.useState<string | null>(null);

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
        queryClient.invalidateQueries({queryKey:['bussiness']});
        queryClient.invalidateQueries({queryKey:['bussinessCount']});
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

  // const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setLogo(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className={cn("sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px] p-6",style)}>
      <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
        Basic Details
      </span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-4">
                <div className="flex gap-3 flex-col w-full">
                  <div className="flex gap-3 items-center">
                    <FormField
                      name="business_type"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <FormLabel className="w-[7rem] text-[13px]">
                            Business Type
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[340px] text-[13px]">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                {bussinessType.map((bussiness, index) => (
                                  <SelectItem key={index} value={bussiness.key}>
                                    {bussiness.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <div>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="text-[13px] w-[6.75rem]">
                            Business Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </div>
                    )}
                  />
                  {/* <div className="flex gap-3 items-center"> */}
                    <FormField
                      control={form.control}
                      name="business_reg_date"
                      render={({ field, fieldState: { error } }) => (
                        <div className="flex gap-3 items-center">
                          <FormLabel className="text-[13px] w-[6.75rem]">Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[340px] justify-start text-left text-xs font-normal",
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
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
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
                        </div>
                      )}
                    />
                  {/* </div> */}
                  <FormField
                    control={form.control}
                    name="business_pan"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="text-[13px] w-[6.75rem]">
                            PAN Card
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="text-[13px] w-[6.75rem]">
                            Official Email Id
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="text-[13px] w-[6.75rem]">
                            State
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[340px] text-[13px]">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.key} value={state.key}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-3 flex-col w-full">
                  <FormField
                    control={form.control}
                    name="business_address_2"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            Reg. Address-2
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_reg_no"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            CIN/ Reg. No.
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_mobile"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            Official Mobile
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_address_1"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            Reg. Address-1{" "}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="business_pincode"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-3 items-center">
                          <FormLabel className="w-[6.75rem] text-[13px]">
                            Pin Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-[340px] text-[13px]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col gap-y-4 sm:flex-col md:flex-row lg:flex-row gap-x-5">
                {/* <FormField
                  control={form.control}
                  name="businessLogo"
                  render={({ field: {} }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors h-[100px]">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="logo-upload"
                            onChange={handleLogoUpload}
                          />
                          <Label
                            htmlFor="logo-upload"
                            className="cursor-pointer"
                          >
                            {logo ? (
                              <Image
                                src={logo}
                                alt="Business logo"
                                className="max-h-24 mx-auto"
                              />
                            ) : (
                              <div className="h-[60px] flex items-center justify-center">
                                Upload Logo (1*1)
                              </div>
                            )}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <div>
                      <div className="flex gap-3 flex-col items-left">
                        <FormLabel className="w-full text-[13px]">
                          About the Bussiness
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="w-[800px] h-[100px]"
                          />
                        </FormControl>
                      </div>
                    </div>
                  )}
                />
              </div>
              {/* <div className="flex justify-between"> */}
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
              {/* </div> */}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBussinessDialog;