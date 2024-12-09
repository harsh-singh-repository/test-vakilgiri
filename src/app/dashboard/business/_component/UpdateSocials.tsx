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
import { BussinessIdSettingsPageProps } from "../_types"

const formSchema = z.object({
  website: z.string().url({ message: "Please enter a valid URL" }).optional(),
  twitter: z.string().url({ message: "Please enter a valid Twitter URL" }).optional(),
  facebook: z.string().url({ message: "Please enter a valid Facebook URL" }).optional(),
  instagram: z.string().url({ message: "Please enter a valid Instagram URL" }).optional(),
})

export default function UpdateSocials({bussinessId}:BussinessIdSettingsPageProps) {
  
    console.log(bussinessId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-red-500 flex-shrink-0" />
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
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Facebook className="mr-2 h-5 w-5 text-red-500 flex-shrink-0" />
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
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Twitter className="mr-2 h-5 w-5 text-red-500 flex-shrink-0" />
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
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Instagram className="mr-2 h-5 w-5 text-red-500 flex-shrink-0" />
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
          <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

