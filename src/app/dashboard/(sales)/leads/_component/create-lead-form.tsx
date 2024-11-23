'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { X } from 'lucide-react'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  // FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"

const formSchema = z.object({
  existingLead: z.string({
    required_error: "Please select if this is an existing lead",
  }),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  contactPerson: z.string({
    required_error: "Please select a contact person",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  emailId: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  state: z.string({
    required_error: "Please select a state",
  }),
  service: z.string({
    required_error: "Please select a service",
  }),
  leadValue: z.string().min(1, {
    message: "Please enter a lead value",
  }),
})

export default function CreateLeadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      existingLead: "",
      businessName: "",
      contactPerson: "",
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNumber: "",
      state: "",
      service: "",
      leadValue: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <DialogContent>
    {/* <div className="w-full max-w-md mx-auto p-2"> */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-center rounded-t-lg flex-col">
            <DialogTitle className="text-xl font-semibold">Create Lead</DialogTitle>
            <p className="text-sm">Fill all the information correctly</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="existingLead"
              render={({ field }) => (
                <div>
                  <FormLabel>Existing Lead</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <div>
                  <FormLabel>Business</FormLabel>
                  <FormControl>
                    <Input placeholder="Business Name" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <div>
                  <FormLabel>Contact Person</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client1">Client 1</SelectItem>
                      <SelectItem value="client2">Client 2</SelectItem>
                      <SelectItem value="client3">Client 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <div>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <div>
                  <FormLabel>Email Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email Id" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <div>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Mobile Number" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <div>
                  <FormLabel>Select State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="state1">State 1</SelectItem>
                      <SelectItem value="state2">State 2</SelectItem>
                      <SelectItem value="state3">State 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <div>
                  <FormLabel>Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="service1">Service 1</SelectItem>
                      <SelectItem value="service2">Service 2</SelectItem>
                      <SelectItem value="service3">Service 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="leadValue"
              render={({ field }) => (
                <div>
                  <FormLabel>Lead Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Lead Value" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <Button type="submit" className="w-full bg-gray-400 hover:bg-gray-500">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    {/* </div> */}
    </DialogContent>
  )
}