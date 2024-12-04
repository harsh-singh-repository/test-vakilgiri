"use client";

import { Input } from "@/components/ui/input";
import Image from 'next/image';
import React from 'react';
import logo from "@/app/assets/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ForgetPasswordProps } from "../_types";
import { ForgetPasswordformSchema } from "../_types/zodSchema";
import { useForgetPassoword } from "@/hooks/auth/manage-auth";
import { toast } from "sonner";

const ForgetPassword: React.FC<ForgetPasswordProps> = ({
  handleBackToLogin
}) => {
  const form = useForm<z.infer<typeof ForgetPasswordformSchema>>({
    resolver: zodResolver(ForgetPasswordformSchema),
    defaultValues: {
      email: "",
    },
  });

  const {mutate} = useForgetPassoword();

  function onSubmit(data: z.infer<typeof ForgetPasswordformSchema>) {
      mutate(data,{
        onSuccess:()=>{
           toast.success(`OTP sended to your email`);
        },
        onError:(error)=>{
          toast.error(`Failed in Sending otp: ${error}`)
        }
      })
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center p-6 w-full">
      <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Reset Password</h1>
      <span className="text-[#091747] font-medium text-base">We all forget !</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1.5 text-left"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel htmlFor="email" className="text-[#091747] font-[600] text-[13px]">Email ID</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          
          <Button type="submit" className="hover:bg-[#091747] bg-[#f21300]">Send Password Reset Link</Button>

          <Button type="submit" className="hover:bg-[#091747] bg-[#F20101]">
            Send Password Reset Link
          </Button>

          <div
            className="flex gap-1 items-center justify-center"
            onClick={handleBackToLogin}
          >
            <ChevronLeft />
            <span className="font-medium text-[#f21300] cursor-pointer" >Back to Login</span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
