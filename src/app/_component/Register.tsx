'use client'

import Logo from '@/app/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { OtpVerifyForm } from './OtpVerify'
import { RegisterProps } from '../_types'
import { RegisterformSchema } from '../_types/zodSchema'
import CustomDatePicker from '@/components/date-picker/CustomDatePicker'
import { Eye, EyeOff } from 'lucide-react'




export default function Register({ alreadyLogin }: RegisterProps) {
  const [otpVerified, setOtpVerified] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof RegisterformSchema>>({
    resolver: zodResolver(RegisterformSchema),
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

  async function onSubmit(data: z.infer<typeof RegisterformSchema>) {
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
            render={({}) => (
              <FormItem>
                {/* <Popover>
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
                </Popover> */}
                <CustomDatePicker />
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
                    <div className="relative">
                    <Input 
                      type={showPassword? "text": "password"} 
                      placeholder="Password" 
                      {...field} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    </div>
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