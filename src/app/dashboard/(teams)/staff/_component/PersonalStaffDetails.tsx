import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    pan: z.string().min(10, "PAN must be 10 characters").max(10),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.string(),
    mobile: z.string().min(10, "Mobile number must be 10 digits").max(10),
    dateOfBirth: z.string(),
    role: z.string(),
    aadhaar: z.string().min(12, "Aadhaar must be 12 digits").max(12),
    address1: z.string().min(1, "Address is required"),
    address2: z.string(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
    loginStatus: z.string(),
});

export const PersonalStaffDetails = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          pan: "KAOPK5453D",
          firstName: "DEV",
          lastName: "KHANDELWAL",
          email: "devkhandelwal491@gmail.com",
          gender: "Male",
          mobile: "6395247801",
          dateOfBirth: "2002-06-04",
          role: "Staff",
          aadhaar: "210465977459",
          address1: "KHANDARI",
          address2: "AZAD NAGAR",
          city: "AGRA",
          state: "Uttar Pradesh",
          pincode: "282002",
          loginStatus: "Active",
        },
      });
    
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
      }
  return (
    <div>
         <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault(); // Prevent the default behavior
                  form.handleSubmit(onSubmit)(event); // Call the Zod resolver and form submission handler
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-4">
                  <FormField
                    control={form.control}
                    name="pan"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <FormLabel className="text-[13px] w-[6.75rem]">
                          PAN
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full text-[13px]"
                          />
                        </FormControl>
                    </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <FormLabel className="text-[13px] w-[6.75rem]">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full text-[13px]"
                          />
                        </FormControl>
                    </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                    </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                         <FormLabel className="text-[13px] w-[6.75rem]">
                          Gender
                      </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Mobile No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                          type='date'
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Staff
                      </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Staff">Staff</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aadhaar"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Aadhaar
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Address 1.
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Address 2.
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        State
                      </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Uttar Pradesh">
                              Uttar Pradesh
                            </SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Maharashtra">
                              Maharashtra
                            </SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Pincode
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"
                        />
                      </FormControl>
                  </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loginStatus"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Login Status
                      </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Login Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
    </div>
  )
}
