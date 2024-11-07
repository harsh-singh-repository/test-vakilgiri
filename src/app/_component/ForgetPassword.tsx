"use client";

import { z } from "zod";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";

import logo from "@/app/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

interface ForgetPasswordProps {
  handleBackToLogin: () => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({
  handleBackToLogin,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("DATA>>>", data);
    alert("Reset Password Successful");
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center p-6 w-full">
      <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Reset Password</h1>
      <span className="text-[#002537] font-medium text-base">
        We all forget
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1.5 text-left"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email ID</Label>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="hover:bg-[#091747] bg-[#F20101]">
            Send Password Reset Link
          </Button>

          <div
            className="flex gap-1 items-center justify-center"
            onClick={handleBackToLogin}
          >
            <ChevronLeft />
            <span className="font-medium text-[#F20101] cursor-pointer">
              Back to Login
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
