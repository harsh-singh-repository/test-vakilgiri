"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/app/assets/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

// Define schema with gender and birthdate fields
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  pan: z.string().min(10, { message: "Pan number should be 10 digits" }),
  gender: z.enum(["male", "female", "not-specified"], {
    message: "Gender is required",
  }),
  birthdate: z.date({ required_error: "Birthdate is required" }),
});

interface LoginProps {
  handleForgetPassword: () => void;
  handleRegistration: () => void;
}

const Login: React.FC<LoginProps> = ({
  handleForgetPassword,
  handleRegistration,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pan: "",
      birthdate: undefined,
    },
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Login Successful", data);
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center w-[48rem] p-4">
      <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Welcome Back!</h1>
      <span className="text-[#091747] font-[600] text-[15px]">
        Please sign in to your account and start the adventure
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1.5 text-left"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">Email ID</FormLabel>
                  <Input type="email" placeholder="Enter Email" {...field} />
                <FormMessage />
              </div>
            )}
          />

          {/* PAN Field */}
          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">PAN Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter PAN Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FormLabel className="text-[#091747] font-[600] text-[13px]" htmlFor="payment-date">
                Birthdate
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="payment-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {date ? date.toDateString() : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>{form.formState.errors.birthdate?.message}</FormMessage>
            </div>

            <div className="space-y-2">
              {/* Gender Selection */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <div>
                    <FormLabel className="text-[#091747] font-[600] text-[13px]">Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="not-specified">
                              Prefer not to say
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="hover:bg-[#091747] bg-[#f21300]">
            Login
          </Button>

          {/* Forget Password */}
          <div
            className="text-xs w-full text-right font-medium text-[#f21300] cursor-pointer"
            onClick={handleForgetPassword}
          >
            Forget password?
          </div>

          {/* Registration Link */}
          <div className="flex gap-1 items-center justify-center text-[#091747] font-medium">
            Not a Vakilgiri Client?{" "}
            <span
              className="font-medium text-[#F20101] cursor-pointer"
              onClick={handleRegistration}
            >
              Register
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
