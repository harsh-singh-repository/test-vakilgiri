"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Printer, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { directorFormSchema, DirectorFormValues } from "../_types/options"

export default function DirectorForm() {
  const form = useForm<DirectorFormValues>({
    resolver: zodResolver(directorFormSchema),
    defaultValues: {
      pan: "",
      fullName: "",
      mobileNumber: "",
      emailId: "",
      din: "",
      shareholding: 0,
    },
  })

  async function onSubmit(data: DirectorFormValues) {
    // You can handle the form submission here
    console.log(data)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-3">
      <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
        Directors Form
      </span>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 p-4 rounded-b-lg space-y-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* PAN Field */}
            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">PAN</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="Pan Number" {...field} className="pr-8" />
                    </FormControl>
                    <Button 
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      onClick={() => {
                        // Handle PAN search
                        console.log("Searching PAN:", field.value)
                      }}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile Number Field */}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Email Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Id" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DIN Field */}
            <FormField
              control={form.control}
              name="din"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">DIN</FormLabel>
                  <FormControl>
                    <Input placeholder="DIN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shareholding Field */}
            <FormField
              control={form.control}
              name="shareholding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Shareholding</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="%" 
                        type="number"
                        min={0}
                        max={100}
                        {...field}
                        onChange={event => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <Button 
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                      onClick={() => {
                        // Handle print action
                        console.log("Printing shareholding details")
                      }}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

