"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useEditClient, useGetClientsById } from "@/hooks/users/manage-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { clientIdProps } from "../_types"
import { PersonalDataformSchema } from "../_types/zodSchema"





const Personal_Form = ({clientId}:clientIdProps) => {
   
  const {
    data,
    // isLoading
  } = useGetClientsById(clientId);
  
  // console.log("idDetails",data);
  const {mutate} = useEditClient(clientId);

  // if(isLoading){
  //  return <h1>Loading....</h1>
  // }
  
  const form = useForm<z.infer<typeof PersonalDataformSchema>>({
    resolver: zodResolver(PersonalDataformSchema),
    defaultValues:{
      pan: data?.pan,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email ?? "",
      gender: data?.gender ?? "Male",
      mobileNumber: data?.mobileNumber ?? "",
      dob: data?.dob ?? "11/07/2024",
      aadhaar: data?.aadhaar ?? "112312312321",
      din: data?.din ?? "",
      dscInfo: data?.dscInfo ?? "Not_Applicable",
      loginStatus: data?.loginStatus ?? "Active",
      kycStatus: data?.kycStatus ?? "Pending",
    },
  });
  
  function onSubmit(values: z.infer<typeof PersonalDataformSchema>) {
      mutate(values,{
        onSuccess: () => {
          toast.success("Client Updated successfully!");
          // form.reset();
        },
        onError: (error) => {
          toast.error(`Failed to create client: ${error.message}`);
        },
      })
      
      console.log("Values",values);
  }
  return (
    
    <>
       {data &&
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Card</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Father's Name's" />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Id</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No.</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadhaar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar No.</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="din"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DIN</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter DIN" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dscInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DSC Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Not_Applicable">Not Applicable</SelectItem>
                          <SelectItem value="With_Vakilgiri">With Vakilgiri</SelectItem>
                          <SelectItem value="With_Client">With Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loginStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Login Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kycStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KYC Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Save Profile
                </Button>
              </div>
            </form>
          </Form>
          }
    </>
  );
};

export default Personal_Form;
