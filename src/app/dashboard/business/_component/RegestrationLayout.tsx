"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useEditBusinessRegistration, useGetBussinessRegistaration} from "@/hooks/business/manage-business";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    businessDarpan: z.string().optional(),
    businessDarpanVerified: z.boolean().default(false),
    csr: z.string().optional(),
    csrVerified: z.boolean().default(false),
    gst: z.string().optional(),
    gstVerified: z.boolean().default(false),
    msme: z.string().optional(),
    msmeVerified: z.boolean().default(false),
  })
  .refine(
    (data) =>
      !data.businessDarpanVerified ||
      (data.businessDarpan && data.businessDarpan.trim() !== ""),
    {
      message:
        "businessDarpan cannot be null or empty if businessDarpanVerified is true",
      path: ["businessDarpan"], // Specify the field causing the error
    }
  )
  .refine((data) => !data.csrVerified || (data.csr && data.csr.trim() !== ""), {
    message: "csr cannot be null or empty if csrVerified is true",
    path: ["csr"],
  })
  .refine((data) => !data.gstVerified || (data.gst && data.gst.trim() !== ""), {
    message: "gst cannot be null or empty if gstVerified is true",
    path: ["gst"],
  })
  .refine(
    (data) => !data.msmeVerified || (data.msme && data.msme.trim() !== ""),
    {
      message: "msme cannot be null or empty if msmeVerified is true",
      path: ["msme"],
    }
  );

export default function AddBussinessRegistrationLayout() {
  const params = useParams();
  const bussinessId = params?.bussinessId; // ✅ Safe Access

  const [defaultValues, setDefaultValues] = React.useState<
    z.infer<typeof formSchema>
  >({
    businessDarpan: "",
    businessDarpanVerified: false,
    csr: "",
    csrVerified: false,
    gst: "",
    gstVerified: false,
    msme: "",
    msmeVerified: false,
  });

  const { data } = useGetBussinessRegistaration(bussinessId);
  const {mutate:bussinessRegister} =  useEditBusinessRegistration(data?.id)

  console.log("dataRegistartion", data);

  React.useEffect(() => {
    if (data) {
      setDefaultValues((prevValues) => {
        // Only update if the data has changed to prevent unnecessary re-renders
        return prevValues !== data
          ? {
              businessDarpan: data?.businessDarpan,
              businessDarpanVerified: data?.businessDarpanVerified,
              csr: data?.csr,
              csrVerified: data?.csrVerified,
              gst: data?.gst,
              gstVerified: data?.gstVerified,
              msme: data?.msme,
              msmeVerified: data?.msmeVerified,
            }
          : prevValues;
      });
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues && form) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    bussinessRegister(values,{
      onSuccess:()=>{
        toast.success("Bussiness Registration Updated.")
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
                    <h3 className="text-xs font-medium">
                      1. Do you have CSR-1 Registration?
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      This registration enables NGO to get exemption on
                      donations under IncomeTax
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="csrVerified"
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
                {form.watch("csrVerified") && (
                  <FormField
                    control={form.control}
                    name="csr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CSR-1 Reg. Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CSR-1 Registration Number"
                            {...field}
                            className="border-gray-300"
                          />
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
                    <h3 className="text-xs font-medium">
                      2. Do you have MSME Registration?
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      This registration enables NGO to get exemption on
                      donations under IncomeTax
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="msmeVerified"
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
                {form.watch("msmeVerified") && (
                  <FormField
                    control={form.control}
                    name="msme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MSME Reg. Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="MSME Number"
                            {...field}
                            className="border-gray-300"
                          />
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
                    <h3 className="text-xs font-medium">
                      3. Do you have GST Registration?
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      This registration enables NGO to get exemption on
                      donations under IncomeTax
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="gstVerified"
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
                {form.watch("gstVerified") && (
                  <FormField
                    control={form.control}
                    name="gst"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="GSTIN"
                            {...field}
                            className="border-gray-300"
                          />
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
                    <h3 className="text-xs font-medium">
                      4. Do you have NGO Darpan Registration?
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      This registration enables NGO to get exemption on
                      donations under IncomeTax
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="businessDarpanVerified"
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
                {form.watch("businessDarpanVerified") && (
                  <FormField
                    control={form.control}
                    name="businessDarpan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NGO Darpan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Darpan Number"
                            {...field}
                            className="border-gray-300"
                          />
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
            <Button
              type="submit"
              className="bg-[#f32100] hover:bg-[#f32100]/70 text-white px-8 py-2 text-sm"
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
