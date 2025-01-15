"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressformSchema } from "../_types/zodSchema";
import { useEditClient, useGetClientsById } from "@/hooks/clients/manage-client";
import { clientIdProps } from "../_types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Oval } from "react-loader-spinner";

export default function Component({ clientId }: clientIdProps) {
  const { data } = useGetClientsById(clientId);
  const { mutate } = useEditClient(clientId);

  console.log("Client ID data",data)

  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof AddressformSchema>
  >({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const form = useForm<z.infer<typeof AddressformSchema>>({
    resolver: zodResolver(AddressformSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      setDefaultValues((prevValues) => {
        // Only update if the data has changed to prevent unnecessary re-renders
        return prevValues !== data
          ? {
              address1: data?.address1,
              address2: data?.address2,
              city: data?.city,
              state: data?.state,
              pincode: data?.pincode,
            }
          : prevValues;
      });
    }
  }, [data]);

  useEffect(() => {
    if (defaultValues && form) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  function onSubmit(values: z.infer<typeof AddressformSchema>) {
    mutate(values,{
      onSuccess:()=>{
         toast.success("Client Updated Successfully.")
      },
      onError:(error)=>{
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);
    
          // Display error message in toast
          toast.error(`Failed to create client: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      }
    })
  }

  const states = [
    "Andhra Pradesh",
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Gujarat",
    // Add other states as needed
  ];

  if(!data){
    return(
      <div className="flex justify-center items-center h-full">
            <Oval
          visible={true}
          height="40"
          width="40"
          color="#f21300"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-rows-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">Address-1</label>
                  <FormControl>
                    <Input placeholder="Address-1" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">Address-2</label>
                  <FormControl>
                    <Input placeholder="Address-2" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-rows-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">City</label>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">State</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-rows-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">Pincode</label>
                  <FormControl>
                    <Input placeholder="Pincode" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Save Address
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
