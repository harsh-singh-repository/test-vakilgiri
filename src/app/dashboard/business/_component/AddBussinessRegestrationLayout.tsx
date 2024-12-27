"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Switch } from "@/components/ui/switch"
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

const formSchema = z.object({
  hasCsr: z.boolean().default(false),
  csrNumber: z.string().optional(),
  hasMsme: z.boolean().default(false),
  msmeNumber: z.string().optional(),
  hasGst: z.boolean().default(false),
  gstNumber: z.string().optional(),
  hasNgoDarpan: z.boolean().default(false),
  darpanNumber: z.string().optional(),
})

export default function AddBussinessRegistrationLayout() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasCsr: false,
      hasMsme: false,
      hasGst: false,
      hasNgoDarpan: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
      <div className="max-w-fit bg-white rounded-lg p-6">
        <div className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
          Registration Details
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* CSR-1 Registration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-1">
                      <h3 className="text-xs font-medium">1. Do you have CSR-1 Registration?</h3>
                      <p className="text-xs text-gray-500 font-normal">
                        This registration enables NGO to get exemption on donations under IncomeTax
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="hasCsr"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#f32100] ml-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("hasCsr") && (
                    <FormField
                      control={form.control}
                      name="csrNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CSR-1 Reg. Number</FormLabel>
                          <FormControl>
                            <Input placeholder="CSR-1 Registration Number" {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* MSME Registration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-medium">2. Do you have MSME Registration?</h3>
                      <p className="text-xs text-gray-500 font-normal">
                        This registration enables NGO to get exemption on donations under IncomeTax
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="hasMsme"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#f32100] ml-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("hasMsme") && (
                    <FormField
                      control={form.control}
                      name="msmeNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MSME Reg. Number</FormLabel>
                          <FormControl>
                            <Input placeholder="MSME Number" {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* GST Registration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-medium">3. Do you have GST Registration?</h3>
                      <p className="text-xs text-gray-500 font-normal">
                        This registration enables NGO to get exemption on donations under IncomeTax
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="hasGst"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#f32100] ml-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("hasGst") && (
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number</FormLabel>
                          <FormControl>
                            <Input placeholder="GSTIN" {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* NGO Darpan Registration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-medium">4. Do you have NGO Darpan Registration?</h3>
                      <p className="text-xs text-gray-500 font-normal">
                        This registration enables NGO to get exemption on donations under IncomeTax
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="hasNgoDarpan"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#f32100] ml-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("hasNgoDarpan") && (
                    <FormField
                      control={form.control}
                      name="darpanNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NGO Darpan</FormLabel>
                          <FormControl>
                            <Input placeholder="Darpan Number" {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-[#f32100] hover:bg-[#f32100]/70 text-white px-8 py-2 text-sm">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
  )
}

