import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { dateZodSchema } from "../_types/zodSchema";
import { useAddStaffOfficials } from "@/hooks/user/manage-user";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

const DepartmentType = z.enum(["HR", "IT", "Finance", "Marketing"]).nullable();

export const officialFormSchema = z.object({
  officialEmail: z.string().email().max(50).optional(),
  officialMobile: z.string().max(15).optional(),
  // qualification: QualificationEnum.optional(),
  department: DepartmentType.optional(),
  COPid: z.string().optional(),
  membershipNo: z.string().optional(),
  expertise: z.record(z.any()).optional(), // JSON field
  joiningDate: dateZodSchema.optional(),
  cessationDate: dateZodSchema.optional(),
  joiningSalary: z.number().optional(),
  currentSalary: z.number().optional(),
  slug: z.string().optional(),
});


const OfficialForm = () => {
  const {staffId} = useParams();
 

  const [loader, setLoader] = useState<boolean>(false);

  const officialForm = useForm<z.infer<typeof officialFormSchema>>({
    resolver: zodResolver(officialFormSchema),
    defaultValues: {
      joiningDate: "2024-02-05",
      officialEmail: "DEV@VAKILGIRI.COM",
      officialMobile: "6395247801",
      cessationDate: "2022-09-18",
      currentSalary: 12000,
      department: undefined,
      // role: "Jr-Sales",
    },
  });

  const {mutate} = useAddStaffOfficials(staffId)

  function onOfficialSubmit(values: z.infer<typeof officialFormSchema>) {
    setLoader(true);
    console.log("Official form values:", values);
    mutate(values,{
      onSuccess:()=>{
        toast.success(`Client Updated Successfully`)
      },
       onError: (error) => {
              setLoader(false);
              if (error instanceof AxiosError) {
                // Safely access the response data
                const errorMessage =
                  error.response?.data?.message || "An unexpected error occurred.";
                // console.log("Axios Error Message:", errorMessage);
      
                // Display error message in toast
                toast.error(`Failed to Update Staff: ${errorMessage}`);
              } else {
                // Handle non-Axios errors
                toast.error("An unexpected error occurred.");
              }
            },
    })
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
                      className="w-full text-[13px]"
                      type="date"
                    />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={officialForm.control}
              name="officialEmail"
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <FormLabel className="text-[13px] w-[6.75rem]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full text-[13px]" />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={officialForm.control}
              name="officialMobile"
              render={({ field }) => (
                <div className="flex items-center ">
                  <FormLabel className="text-[13px] w-[9rem]">
                    Official Mobile
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full text-[13px]" />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={officialForm.control}
              name="cessationDate"
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <FormLabel className="text-[13px] w-[6.75rem]">
                    Resig. Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-[13px]"
                      type="date"
                    />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={officialForm.control}
              name="currentSalary"
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <FormLabel className="text-[13px] w-[6.75rem]">
                    Salary P.M.
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full text-[13px]" />
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
                    onValueChange={(value) =>
                      field.onChange(value ?? undefined)
                    }
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />

            {/* <FormField
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
                      /> */}

            <div className="col-span-2 flex justify-end">
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {loader ? "Loading..." : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OfficialForm;
