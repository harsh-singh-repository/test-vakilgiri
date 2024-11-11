"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/app/assets/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";

// Define schema with gender and birthdate fields
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
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
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Email ID
                </FormLabel>
                <Input type="email" placeholder="Enter Email" {...field} />
                <FormMessage />
              </div>
            )}
          />

          {/* PAN Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          

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
