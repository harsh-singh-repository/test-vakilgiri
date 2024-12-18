"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from 'lucide-react'
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAddClient } from "@/hooks/clients/manage-client"

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
]

const AddClientFormSchema = z.object({
  First_Name: z.string().min(1, "First name is required"),
  Last_Name: z.string().min(1, "Last name is required"),
  PAN: z.string().min(10, "PAN must be 10 characters").max(10),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  Mobile_Number: z.string().min(10, "Mobile number must be 10 digits").max(10),
  City: z.string().min(1, "City is required"),
  State: z.string().min(1, "State is required"),
  Pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  Alternate_Mobile_Number: z.string().optional(),
  Address_1: z.string().min(1, "Address is required"),
  Address_2: z.string().optional(),
  Aadhaar: z.string().min(12, "Aadhaar must be 12 digits").max(12),
  sendMailToClient: z.boolean(),
})

type AddClientFormValues = z.infer<typeof AddClientFormSchema>

interface AddClientDialogProps {
  onClose: () => void
}

export default function AddClientDialog({ onClose }: AddClientDialogProps) {
  const { mutate: addUser } = useAddClient()
  const queryClient = useQueryClient()

  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(AddClientFormSchema),
    defaultValues: {
      First_Name: "",
      Last_Name: "",
      PAN: "",
      email: "",
      gender: "Male",
      Mobile_Number: "",
      City: "",
      State: "",
      Pincode: "",
      Alternate_Mobile_Number: "",
      Address_1: "",
      Address_2: "",
      Aadhaar: "",
      sendMailToClient: true,
    },
  })

  function onSubmit(data: AddClientFormValues) {
    addUser(data, {
      onSuccess: () => {
        toast.success("Client created successfully!")
        queryClient.invalidateQueries({ queryKey: ["clients"] })
        form.reset()
      },
      onError: (error) => {
        toast.error(`Failed to create client: ${error.message}`)
      },
    })
  }

  return (
    <div className="px-2 py-2">
      <div className="items-center">
        <div className="flex items-center justify-between px-4">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#091747]">
              Create New Client
            </h2>
            <p className="text-[#f21300] text-sm mt-1">
              Fill all the information correctly to avoid duplicacy.
            </p>
          </div>
          <button className="text-[#f21300]" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="PAN"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">PAN</FormLabel>
                <FormControl>
                  <Input placeholder="PAN" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                </FormControl>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="First_Name"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">First Name</FormLabel>
                  <FormControl>
                    <Input disabled {...field} placeholder="First Name" readOnly className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Name"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">Last Name</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Last Name" {...field} readOnly className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                  </FormControl>
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                </FormControl>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="Mobile_Number"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Aadhaar"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Aadhaar Number" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                  </FormControl>
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="Address_1"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">Address 1</FormLabel>
                <FormControl>
                  <Input placeholder="Address-1" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                </FormControl>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="Address_2"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">Address 2</FormLabel>
                <FormControl>
                  <Input placeholder="Address-2" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                </FormControl>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="State"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[11px] font-semibold text-[#091747]">Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="City"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]" />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="Pincode"
              render={({ field }) => (
                <div>
                  <FormLabel className="text-[11px] font-semibold text-[#091747]">Pincode</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Pincode"
                      {...field}
                      className="border-[#091747] text-[13px] py-0 placeholder:text-[13px]"
                    />
                  </FormControl>
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sendMailToClient"
            render={({ field }) => (
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[11px] py-0 placeholder:text-[13px] text-[#091747] font-medium">
                    Send Login mail to Client?
                  </FormLabel>
                </div>
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#F21300] hover:bg-[#d11100] text-white"
          >
            Create Client
          </Button>
        </form>
      </Form>
    </div>
  )
}

