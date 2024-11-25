"use client";
import { format } from "date-fns";
import React from "react";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
// import { toast } from "sonner";

const BusinessTypeEnum = z.enum(["type1", "type2", "type3"]).optional();

const formSchema = z.object({
  businessType: BusinessTypeEnum.default("type1").optional(),
  businessName: z.string().min(1, "Business name is required"),
  date: z
    .date({
      required_error: "Date is required",
    })
    .nullable(),
  pan: z.string().min(10, "PAN Card must be 10 characters").max(10),
  cinRegNo: z.string().min(1, "CIN/Reg no. is required"),
  officialNumber: z
    .string()
    .min(10, "Official number must be 10 digits")
    .max(10),
  state: z.string().min(1, "State is required"),
  regAddress1: z.string().min(1, "Registered address is required"),
  regAddress2: z.string().min(1, "Registered address is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(6, "Pin code must be 6 digits").max(6),
  email: z.string().min(1, "Enter EmailId"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB",
    })
    .optional()
    .nullable(),
  aboutBusiness: z.string().min(1, "About the business is required"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
];

const BussinessIdForm = () => {
  const [date, setDate] = React.useState<Date>();
  const [logo, setLogo] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // businessType: "type1",
      businessName: "",
      date: null,
      pan: "",
      cinRegNo: "",
      officialNumber: "",
      regAddress1: "",
      regAddress2: "",
      file: null,
      city: "",
      email: "",
      pinCode: "",
      aboutBusiness: "",
      termsAgreed: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("YourData", data);
    // Handle form submission
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
                                    <SelectItem value="type1">
                                      Type 1
                                    </SelectItem>
                                    <SelectItem value="type2">
                                      Type 2
                                    </SelectItem>
                                    <SelectItem value="type3">
                                      Type 3
                                    </SelectItem>
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
                      <div className="flex gap-3 items-center">
                        <Label className="text-[13px] w-[6.75rem]">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[340px] justify-start text-left text-[13px] font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon size={"10"} />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
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
                        </Popover>
                      </div>
                      <FormField
                        control={form.control}
                        name="pan"
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
                        name="email"
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
                        name="regAddress2"
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
                        name="cinRegNo"
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
                        name="officialNumber"
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
                        name="regAddress1"
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
                        name="pinCode"
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
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field:  {}}) => (
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
                    />
                    <FormField
                      control={form.control}
                      name="aboutBusiness"
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
                      <Button className="py-1 px-2 w-32 text-[13px] bg-[#F21300] hover:bg-[#091747] text-white" type="submit">
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
