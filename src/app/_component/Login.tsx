"use client"

import Image from 'next/image'
import React from 'react'
import logo from "@/app/assets/logo.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'

// Define schema with gender and birthdate fields
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  pan: z.string().min(10, { message: "Pan number should be 10 digits" }),
  gender: z.enum(["male", "female", "not-specified"], { message: "Gender is required" }),
  birthdate: z.date({ required_error: "Birthdate is required" }),
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
      pan: "",
      birthdate: undefined,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    alert("Login Successful")
  }

  return (
    <div className="w-[48rem]">
      <div className="text-black flex flex-col justify-center items-center text-center p-4">
        <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />

        <h1 className="text-black font-bold text-2xl">Welcome Back!</h1>
        <span className="text-[#002537] font-medium text-base">
          Please sign-in to your account and start the adventure
        </span>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-4 w-[16rem] sm:w-[20rem]'>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center text-left">
                  <FormLabel className='text-sm font-semibold mt-1 p-0 text-blue-950'>Email ID</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} className='bg-slate-100 w-full p-2 shadow-sm shadow-slate-500/50'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAN Field */}
            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center text-left">
                  <FormLabel className='text-sm font-[600] mt-1 p-0 text-blue-950'>Pan Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Pan Number" {...field} className='bg-slate-100 w-full p-2 shadow-sm shadow-slate-500/50'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <div className='flex flex-col md:flex-row gap-4 justify-between items-start sm:items-center w-full p-0 m-0'>
            {/* Gender Selection */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 justify-center items-center">
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="bg-slate-100 w-[16rem] md:w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Gender</SelectLabel>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="not-specified">Prefer not to say</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker */}
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="birthdate"
                      render={({ field: controllerField }) => (
                        <DatePicker {...controllerField} onChange={controllerField.onChange} className="bg-slate-100 w-[16rem] md:w-full" />
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

            <div className="text-xs w-full text-right font-medium text-[#F20101] cursor-pointer" onClick={handleForgetPassword}>
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
