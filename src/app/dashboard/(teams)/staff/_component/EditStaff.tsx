"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Search, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface onCloseProp {
  onClose: () => void;
}

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

const bankFormSchema = z.object({
  ifsc: z.string().min(11, "IFSC must be 11 characters").max(11),
  accountNumber: z.string().min(9, "Invalid account number").max(18),
  accountType: z.string(),
  accountHolder: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  branchAddress: z.string().min(1, "Branch address is required"),
  isPrimaryAccount: z.boolean().default(false),
});

const officialFormSchema = z.object({
  joiningDate: z.string(),
  officeEmail: z.string().email("Invalid email address"),
  officeMobile: z.string().min(10, "Mobile number must be 10 digits").max(10),
  resignationDate: z.string().optional(),
  salaryPm: z.string().min(1, "Salary is required"),
  department: z.string(),
  role: z.string(),
});

export default function EditStaff({ onClose }: onCloseProp) {


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

  const officialForm = useForm<z.infer<typeof officialFormSchema>>({
    resolver: zodResolver(officialFormSchema),
    defaultValues: {
      joiningDate: "2024-02-05",
      officeEmail: "DEV@VAKILGIRI.COM",
      officeMobile: "6395247801",
      resignationDate: "",
      salaryPm: "12000",
      department: "Sales",
      role: "Jr-Sales",
    },
  });

  const bankForm = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      ifsc: "",
      accountNumber: "",
      accountType: "",
      accountHolder: "",
      bankName: "",
      branchAddress: "",
      isPrimaryAccount: false,
    },
  });

  function onBankSubmit(values: z.infer<typeof bankFormSchema>) {
    console.log("Bank form values:", values);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onOfficialSubmit(values: z.infer<typeof officialFormSchema>) {
    console.log("Official form values:", values);
  }
  
  return (
    <div className="w-[800px] mx-auto p-1 pb-20">
      <div className="flex flex-row justify-center items-center">
        <div>
          <span className="text-xl font-semibold mb-6 text-center text-[#091747]">
            Edit:
          </span>
        </div>
        <div
          className="bg-[#091747] text-white cursor-pointer p-1 rounded-md absolute translate-x-[24rem]"
          onClick={onClose}
        >
          <X className="w-4 h-4" strokeWidth={"4"} />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="multiple" className="w-full mt-5">
            <AccordionItem value="discussions" className="w-full">
              <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium">
                <span>1. Personal Details</span>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className="grid grid-cols-2 gap-6 p-4">
                  <FormField
                    control={form.control}
                    name="pan"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="PAN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email Id"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Mobile No."
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Date of Birth"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aadhaar"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Aadhaar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address-2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loginStatus"
                    render={({ field }) => (
                      <FormItem>
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
                      </FormItem>
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="official-details" className="w-full">
              <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium mt-4">
                <span>2. Official Details</span>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <Form {...officialForm}>
                <form onSubmit={officialForm.handleSubmit(onOfficialSubmit)}>
                    <div className="grid grid-cols-2 gap-6 p-4">
                      <FormField
                        control={officialForm.control}
                        name="joiningDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="date"
                                placeholder="Joining Date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="officeEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Office Email"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="officeMobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Office Mobile"
                                type="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="resignationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="date"
                                placeholder="Resignation Date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="salaryPm"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Salary p.m."
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Marketing">
                                  Marketing
                                </SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="IT">IT</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
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
                                <SelectItem value="Jr-Sales">
                                  Jr-Sales
                                </SelectItem>
                                <SelectItem value="Sr-Sales">
                                  Sr-Sales
                                </SelectItem>
                                <SelectItem value="Sales-Manager">
                                  Sales Manager
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2 flex justify-end">
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bank-details" className="border-none mt-4">
              <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium">
                <span>3. Bank Details</span>
              </AccordionTrigger>
              <AccordionContent className="w-full pt-6">
                <Form {...bankForm}>
                  <form onSubmit={bankForm.handleSubmit(onBankSubmit)}>
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={bankForm.control}
                        name="ifsc"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="IFSC"
                                  {...field}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  onClick={() => console.log("Search IFSC")}
                                >
                                  <Search className="h-4 w-4" />
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Account Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Account Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="current">Current</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter Full Name"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Bank Name"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="branchAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Bank Address"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2 flex justify-between items-center">
                        <FormField
                          control={bankForm.control}
                          name="isPrimaryAccount"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <span className="text-sm text-gray-700">
                                Is this your Primary Account
                              </span>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                        >
                          Add Account
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
}
