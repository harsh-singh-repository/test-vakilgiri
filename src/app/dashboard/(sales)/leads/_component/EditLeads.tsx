"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MaterialInput } from "@/components/material-input"
import { useGetLeadsById, useUpdateLeadsDetails } from "@/hooks/leads/manage-leads"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits").optional(),
  email: z.string().email("Invalid email address").optional(),
  value: z.string().min(1, "Value is required").optional(),
  status: z.string().min(1, "Status is required").optional(),
})

export default function EditLeads({leadId}:{leadId:string}) {
   
    const queryClient = useQueryClient();
    
  const {data} = useGetLeadsById(leadId);
  console.log("leadid",data);

  const {mutate:updateLead} = useUpdateLeadsDetails(leadId)

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      mobileNumber: data?.mobile ?? "",
      email: data?.email ?? "",
      value: data?.value ?? "",
      status: data?.status ?? "",
    },
});


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    updateLead(values,{
        onSuccess:()=>{
            toast.success("Leads Updated Successfully");
            queryClient.invalidateQueries({queryKey:["leadId"]})
        },
        onError:(error)=>{
            if (error instanceof AxiosError) {
                // Safely access the response data
                const errorMessage =
                  error.response?.data?.message || "An unexpected error occurred.";
                // console.log("Axios Error Message:", errorMessage);
      
                // Display error message in toast
                toast.error(`Failed to update Lead: ${errorMessage}`);
              } else {
                // Handle non-Axios errors{
                toast.error(`An unexpected error occurred: ${error}`);
              }
        }
    })
  }

  return (
    <div className="max-h-fit flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl">
        <div className="flex justify-center">
          <span className="text-[14px] font-semibold text-[#091747]">Edit Lead Details</span>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <MaterialInput placeholder="First name" {...field} className="w-[110px]"/>
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <MaterialInput placeholder="Last name" {...field} className="w-[110px]"/>
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <div>
                    <FormControl>
                      <MaterialInput placeholder="Mobile Number" type="tel" {...field} className="w-[230px]"/>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <FormControl>
                      <MaterialInput placeholder="Email Address" type="email" {...field} className="w-[230px]"/>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <div>
                    <FormControl>
                      <MaterialInput placeholder="Enter value" {...field} className="w-[230px]"/>
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <div>
                    <label className="text-[11px] font-semibold text-[#091747]">Status</label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[230px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="disqualified">Disqualified</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="not picked">Not Picked</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full bg-[#f21300] hover:bg-[#091747]">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

