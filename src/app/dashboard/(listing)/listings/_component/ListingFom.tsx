'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { businessFormSchema, type BusinessFormData } from "../_types/options"

export default function ListingForm() {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessType: "",
      askPrice: "",
      monthlySales: "",
      yearlySales: "",
      ebitda: "",
      reasonToSell: "",
      businessDescription: "",
      productsServices: "",
      highlights: "",
      objectives: "",
      facility: "",
      funding: "",
    },
  })

  function onSubmit(data: BusinessFormData) {
     console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] mx-auto p-4 space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>You are interested in</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Business Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="askPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ask Price</FormLabel>
                <FormControl>
                  <Input placeholder="Ask Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="monthlySales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your average monthly sales?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter monthly sales" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="yearlySales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What was your latest reported yearly sales?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter yearly sales" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ebitda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EBITDA / Operating Profit Margin %?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter EBITDA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Large Text Areas */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="reasonToSell"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason to sale your Company</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter your reason for selling" 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe the business in a single line</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter business description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productsServices"
            render={({ field }) => (
              <FormItem>
                <FormLabel>List all products and services of the business</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter products and services"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="highlights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mention highlights of the business including number of clients, growth rate, promoter experience, business relationships, awards, etc</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter business highlights"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectives as per MOA</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter objectives"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your facility such as built-up area, number of floors, rental/lease details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter facility details"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="funding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How is the business funded presently? Mention all debts/loans outstanding and the total number of shareholders/owners of the business with percentage ownership.</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter funding details"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full md:w-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}

