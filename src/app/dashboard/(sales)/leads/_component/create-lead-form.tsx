"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { X } from 'lucide-react'
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  // FormItem,
  // FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CreateLeadformSchema,
  ServicesType,
  states,
} from "../_types/zodSchema";
import { useAddLeads } from "@/hooks/leads/manage-leads";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { MaterialInput } from "@/components/material-input";
import { useSearchBussinessQuery } from "@/hooks/business/manage-business";
import { useState } from "react";
import { BussinessSearchType } from "../_types";

interface onCloseProp{
   onClose:()=>void;
}

export default function CreateLeadForm({onClose}:onCloseProp) {
  
  const [searchQuery,setSearchQuery] = useState<string>("");

  const { mutate: addLeads } = useAddLeads();

  const {data:bussinessSearch} = useSearchBussinessQuery(searchQuery);

  console.log("data",bussinessSearch);

  const query = useQueryClient();

  const form = useForm<z.infer<typeof CreateLeadformSchema>>({
    resolver: zodResolver(CreateLeadformSchema),
    defaultValues: {
      existing: true,
      businessId: undefined,
      client: undefined,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      state: "Andhra_Pradesh",
      service: "CSR_1_Registration",
      value: "",
    },
  });

  function onSubmit(values: z.infer<typeof CreateLeadformSchema>) {
    console.log(values);

    addLeads(values, {
      onSuccess: () => {
        toast.success("Leads created Successfully");
        query.invalidateQueries({queryKey:['leads']})
        onClose();
      },
      onError: (error) => {
        toast.error(`Failed to create lead: ${error}`);
      },
    });
  }

  const existingLead = form.watch("existing");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearchQuery(value)
  }

  console.log(form.watch("existing")); // Watch existingLead state

  return (
    // <DialogContent>
    <div className="w-full"> 
      <div className="bg-white rounded-lg shadow-sm px-2 py-1">
      <div className="relative w-full pb-2 text-center">
      <h2 className="text-2xl font-bold text-[#F31F0D] mt-2">Create Lead</h2>
      <p className="text-sm text-[#091747] font-medium">
        Fill all the information correctly
      </p>
      <button className="absolute right-0 top-0 text-[#F31F0D]" onClick={onClose}>
        <X className="h-5 w-5" />
      </button>
    </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="existing"
              render={({ field }) => (
                <div>
                  <label className="text-[11px] font-semibold text-[#091747]">Existing Lead</label>
                  <Select
                    onValueChange={(value) => field.onChange(value === "yes")}
                    defaultValue={field.value ? "yes" : "no"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[290px] border-[#091747]">
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

            {existingLead && (
              <>
                <FormField
                  control={form.control}
                  name="businessId"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <MaterialInput placeholder="Business Name" {...field} className="w-[290px]" onChange={handleChange}/>
                      </FormControl>
                    </div>
                  )}
                />

                <div className="flex flex-col gap-2">
                {bussinessSearch?.map((bussiness:BussinessSearchType,index:number)=> (
                    <div key={index} className="flex flex-col gap-x-2 bg-[#E7E7E7] text-[#091747] px-2 py-1 rounded-md">
                          <span className="text-[13px] uppercase font-semibold">{bussiness.businessName}</span>
                       <div className="flex flex-row text-[12px]">
                          <span className="font-semibold">PAN:{""}</span>
                          <span>{bussiness.businessPan}</span>
                       </div>
                    </div>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <div>
                      <label className="text-[11px] font-semibold text-[#091747]">Contact Person</label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[290px] border-[#091747]">
                            <SelectValue placeholder="Select Client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="client1">Client 1</SelectItem>
                          <SelectItem value="client2">Client 2</SelectItem>
                          <SelectItem value="client3">Client 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </>
            )}

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div>
                    <FormControl>
                       <MaterialInput placeholder="First Name" {...field} className="w-[140px]"/>
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
                    <FormControl>
                       <MaterialInput placeholder="Last Name" {...field} className="w-[140px]"/>
                    </FormControl>
                    {/* <FormMessage /> */}
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="Enter email Id" {...field} className="w-[290px]"/>
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="Mobile Number" {...field} className="w-[290px] border-[#091747]"/>
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
                  <label className="text-[11px] font-semibold text-[#091747]">Select State</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[290px] border-[#091747]">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state.replace("_", " ")}
                        </SelectItem>
                      ))}
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
                  <label className="text-[11px] font-semibold text-[#091747]">Service</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[290px] border-[#091747]">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ServicesType.options.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <div>
                  <FormControl>
                    <MaterialInput placeholder="Lead Value" {...field} className="w-[290px] border-[#091747]"/>
                  </FormControl>
                  {/* <FormMessage /> */}
                </div>
              )}
            />

            <Button
              type="submit"
              className={`w-full ${
                form.formState.isValid ? "bg-[#F32311]" : "bg-gray-400"
              } hover:${
                form.formState.isValid ? "bg-[#F32311]" : "bg-gray-500"
              }`}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      </div>
    // </DialogContent>
  );
}
