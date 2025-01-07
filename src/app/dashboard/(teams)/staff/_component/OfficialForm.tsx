import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';


const officialFormSchema = z.object({
    joiningDate: z.string(),
    officeEmail: z.string().email("Invalid email address"),
    officeMobile: z.string().min(10, "Mobile number must be 10 digits").max(10),
    resignationDate: z.string().optional(),
    salaryPm: z.string().min(1, "Salary is required"),
    department: z.string(),
    role: z.string(),
  });


const OfficialForm = () => {

    const officialForm = useForm<z.infer<typeof officialFormSchema>>({
        resolver: zodResolver(officialFormSchema),
        defaultValues: {
          joiningDate: "2024-02-05",
          officeEmail: "DEV@VAKILGIRI.COM",
          officeMobile: "6395247801",
          resignationDate: "2022-09-18",
          salaryPm: "12000",
          department: "Sales",
          role: "Jr-Sales",
        },
      });

    function onOfficialSubmit(values: z.infer<typeof officialFormSchema>) {
        console.log("Official form values:", values);
      }
  return (
    <div>
     <Form {...officialForm}>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault(); // Prevent the default behavior
                      officialForm.handleSubmit(onOfficialSubmit)(event); // Call the Zod resolver and form submission handler
                    }}
                  >
                    <div className="grid grid-cols-2 gap-6 p-4">
                      <FormField
                        control={officialForm.control}
                        name="joiningDate"
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Joining Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"type='date'

                        />
                      </FormControl>
                  </div>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="officeEmail"
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
                        control={officialForm.control}
                        name="officeMobile"
                        render={({ field }) => (
                          <div className="flex items-center ">
                          <FormLabel className="text-[13px] w-[9rem]">
                            Official Mobile
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
                        control={officialForm.control}
                        name="resignationDate"
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                      Resig. Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-[13px]"type='date'
                        />
                      </FormControl>
                  </div>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="salaryPm"
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                          <FormLabel className="text-[13px] w-[6.75rem]">
                            Salary P.M.
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
                        control={officialForm.control}
                        name="department"
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Department
                      </FormLabel>
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
                          </div>
                        )}
                      />

                      <FormField
                        control={officialForm.control}
                        name="role"
                        render={({ field }) => (
                          <div className="flex items-center gap-4">
                      <FormLabel className="text-[13px] w-[6.75rem]">
                        Role
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
                          </div>
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
    </div>
  )
}

export default OfficialForm