"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Facebook, Globe, Instagram, Twitter } from 'lucide-react'
import { useEditBussinessDetails } from "@/hooks/business/manage-business"
import { toast } from "sonner"
import { AxiosError } from "axios"
// import { BussinessIdSettingsPageProps } from "../_types"

interface UpdateSocialsProps{
  bussinessId?:string | string[] | undefined
}

const formSchema = z.object({
  businessWebsite: z.string().url({ message: "Please enter a valid URL" }).optional(),
  twitterLink: z.string().url({ message: "Please enter a valid Twitter URL" }).optional(),
  fbLink: z.string().url({ message: "Please enter a valid Facebook URL" }).optional(),
  instaLink: z.string().url({ message: "Please enter a valid Instagram URL" }).optional(),
})

export default function UpdateSocials({bussinessId}:UpdateSocialsProps) {
  
    // console.log(bussinessId);

    const {mutate} = useEditBussinessDetails(bussinessId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessWebsite: "",
      twitterLink: "",
      fbLink: "",
      instaLink: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values,{
      onSuccess:()=>{
        toast.success("Updated Socials")
      },
      onError:(error)=>{
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Remove manager: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-4xl mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="businessWebsite"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-[#f21300] flex-shrink-0" />
                    <Input 
                      placeholder="www.abc.com" 
                      {...field} 
                      className="flex-grow"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fbLink"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Facebook className="mr-2 h-5 w-5 text-[#f21300] flex-shrink-0" />
                    <Input 
                      placeholder="Facebook Link" 
                      {...field} 
                      className="flex-grow"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Twitter className="mr-2 h-5 w-5 text-[#f21300] flex-shrink-0" />
                    <Input 
                      placeholder="www.twitter...." 
                      {...field} 
                      className="flex-grow"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instaLink"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Instagram className="mr-2 h-5 w-5 text-[#f21300] flex-shrink-0" />
                    <Input 
                      placeholder="Instagram Link" 
                      {...field} 
                      className="flex-grow"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-[#f21300] hover:bg-red-600 text-white">
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

