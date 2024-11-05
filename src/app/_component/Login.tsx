"use client"

import Image from 'next/image'
import React from 'react'
import logo from "@/app/assets/logo.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

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
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    alert("Login Successful")
  }

  return (
    <div className="w-[48rem]">
      <div className="text-black flex flex-col justify-center items-center text-center p-4">
        <Image
          src={logo}
          alt="vakilgiri_logo"
          height={150}
          width={150}
        />

        <h1 className="text-black font-bold text-2xl">Welcome Back!</h1>
        <span className="text-[#002537] font-medium text-base">
          Please sign-in to your account and start the adventure
        </span>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center text-left">
                  <FormLabel className='text-sm font-[600] mt-1 p-0 text-blue-950'>Email ID</FormLabel>
                  <FormControl className='m-0 p-0'>
                    <Input type="email" placeholder="Email" {...field} className='bg-slate-100 m-0 w-[22rem] p-2 shadow-sm shadow-slate-500/50'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className="text-xs w-full text-right font-medium text-[#F20101] cursor-pointer"
              onClick={handleForgetPassword}
            >
              Forget password?
            </div>

            <div className="text-center font-medium py-2">
              Not a Vakilgiri Client?{" "}
              <span className="text-[#F20101] cursor-pointer" onClick={handleRegistration}>
                Register
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
