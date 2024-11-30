"use client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
// import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import Image from "next/image";
import { BussinessIdformSchema } from "../_types/zodSchema";
import { BussinessIdSettingsPageProps } from "../_types";
import {
  useEditBussinessDetails,
  useGetBussinessById,
} from "@/hooks/business/manage-business";
import { toast } from "sonner";
// import { toast } from "sonner";

const bussinessType = [
  "Private_Limited",
  "Proprietorship",
  "Partnership_Firm",
  "LLP",
  "Public_Limited",
  "Micro_Finance",
  "Trust",
  "Society",
  "Section_Eight",
  "Producer_Limited",
  "OPC",
  "Nidhi_Limited",
];

const states = [
  "Arunachal_Pradesh",
  "Andhra_Pradesh",
  "Chhattisgarh",
  "Assam",
  "Bihar",
  "Haryana",
  "Goa",
  "Rajasthan",
  "Uttar_Pradesh",
  "Tamil_Nadu",
  "Others",
];

const BussinessIdForm = ({ bussinessId }: BussinessIdSettingsPageProps) => {
  // const [date, setDate] = React.useState<Date>();
  const { data } = useGetBussinessById(bussinessId);
  // const [logo, setLogo] = React.useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof BussinessIdformSchema>
  >({
    businessType: "Micro_Finance", // Will default to "type1" due to `default`
    businessName: "", // Default empty string
    businessRegDate: "", // Default to null
    businessPan: "",
    businessRegNo: "",
    businessMobile: "",
    state: "Andhra_Pradesh",
    businessAddress1: "",
    businessAddress2: "", // Optional field
    city: "",
    businessPincode: "",
    businessEmail: "", // Optional nullable field
    about: "",
  });

  console.log("BussinedssIdDetsils", data);

  const { mutate: editBussiness } = useEditBussinessDetails(bussinessId);

  useEffect(() => {
    if (data) {
      setDefaultValues((prevValues) => {
        // Only update if the data has changed to prevent unnecessary re-renders
        return prevValues !== data
          ? {
              businessType: data?.businessType ?? "", // Will default to "type1" due to `default`
              businessName: data?.businessName ?? "", // Default empty string
              businessRegDate: data?.businessRegDate.split('T')[0] ?? undefined, // Default to null
              businessPan: data?.businessPan ?? "",
              businessRegNo: data?.businessRegNo ?? "",
              businessMobile: data?.businessMobile ?? "",
              state: data?.state,
              businessAddress1: data?.businessAddress1 ?? "",
              businessAddress2: data?.businessAddress2 ?? undefined, // Optional field
              city: data?.city ?? "",
              businessPincode: data?.businessPincode ?? "",
              businessEmail: data?.businessEmail ?? "", // Optional nullable field
              about: data?.about ?? "",
            }
          : prevValues;
      });
    }
  }, [data]);

  console.log("hahahah");

  const form = useForm<z.infer<typeof BussinessIdformSchema>>({
    resolver: zodResolver(BussinessIdformSchema),
    defaultValues,
  });
  console.log(form.formState.errors);

  // useEffect(() => {
  //   if (defaultValues && form) {
  //     form.reset(defaultValues);
  //   }
  // }, [defaultValues, form]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, submitted]);

  const onSubmit = (data: z.infer<typeof BussinessIdformSchema>) => {
    setSubmitted(true);
    console.log("qdygqwdukhqwukd");
    console.log("YourData", data);

    editBussiness(data, {
      onSuccess: () => {
        toast.success("Bussiness upadated Successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update Bussiness: ${error}`);
      },
    });
    // Handle form submission
  };

  console.log("after on submits");

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
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-4">
                <div className="flex gap-3 flex-col w-full">
                  <div className="flex gap-3 items-center">
                    <FormField
                      name="businessType"
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
                                  <SelectItem key={index} value={bussiness}>
                                    {bussiness}
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
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
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
                      </FormItem>
                    )}
                  />
                  {/* <div className="flex gap-3 items-center"> */}
                    <FormField
                      control={form.control}
                      name="businessRegDate"
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
                    name="businessPan"
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
                    name="businessEmail"
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
                                <SelectItem key={state} value={state}>
                                  {state}
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
                    name="businessAddress2"
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
                    name="businessRegNo"
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
                    name="businessMobile"
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
                    name="businessAddress1"
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
                    name="businessPincode"
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
              <div className="flex justify-end">
                <Button
                  className="py-1 px-2 w-32 text-[13px] bg-[#F21300] hover:bg-[#091747] text-white"
                  type="submit"
                >
                  Update
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

export default BussinessIdForm;
