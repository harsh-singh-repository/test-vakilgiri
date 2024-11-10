"use client"

import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import logo from "@/app/assets/logo.png"
import { ChevronLeft } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

interface ForgetPasswordProps {
  handleBackToLogin: () => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({
  handleBackToLogin
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    alert("Reset Password Successful"+data)
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center p-6 w-full">
      <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Reset Password</h1>
      <span className="text-[#091747] font-medium text-base">We all forget !</span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-sm items-center gap-1.5 text-left">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel htmlFor="email" className="text-[#091747] font-[600] text-[13px]">Email ID</FormLabel>
                <FormControl>
                  <Input type="email" id="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          
          <Button type="submit" className="hover:bg-[#091747] bg-[#f21300]">Send Password Reset Link</Button>

          <div className="flex gap-1 items-center justify-center" onClick={handleBackToLogin}>
            <ChevronLeft />
            <span className="font-medium text-[#f21300] cursor-pointer" >Back to Login</span>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ForgetPassword;
