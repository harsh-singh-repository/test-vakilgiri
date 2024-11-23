'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { OtpVerifyForm } from './OtpVerify'
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import Logo from '@/app/assets/logo.png'

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10, { message: "Invalid mobile number" }),
  pan: z.string().min(10, { message: "PAN number should be 10 characters" }),
  birthdate: z.date({ required_error: "Birthdate is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

interface RegisterProps {
  alreadyLogin: () => void;
}

export default function Register({ alreadyLogin }: RegisterProps) {
  const [otpVerified, setOtpVerified] = useState<boolean>(false)
  const [, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      pan: "",
      birthdate: undefined,
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)
      setIsSuccess(true)
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center w-full max-w-3xl p-4">
      <Image src={Logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Welcome to Vakilgiri</h1>
      <span className="text-[#002537] font-medium text-base">
        Please register to your account and start the adventure
      </span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-sm items-center gap-1 text-left">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Enter Mobile Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Enter PAN Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? (field.value as Date).toLocaleDateString() : "Select Date of Birth"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        setDate(date)
                        field.onChange(date)
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!otpVerified ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#f21300] text-white hover:bg-[#d11100]">
                  Verify Email with OTP
                </Button>
              </DialogTrigger>
              <DialogContent>
                <OtpVerifyForm setOtpVerify={setOtpVerified} />
              </DialogContent>
            </Dialog>
          ) : (
            <Button type="submit" className="w-full bg-[#f21300] hover:bg-[#d11100] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          )}

          {isSubmitting && <p className="text-center text-gray-500">Submitting...</p>}
          {isSuccess && <p className="text-center text-green-500">Registration successful!</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="flex gap-1 items-center justify-center text-sky-950 font-medium">
            Already a Client?{" "}
            <Button
              variant="link"
              className="font-medium text-[#f21300] p-0 h-auto"
              onClick={alreadyLogin}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}