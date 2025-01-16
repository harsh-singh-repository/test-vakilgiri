"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditClient,
  useGetClientsById,
} from "../../../../hooks/clients/manage-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { clientIdProps } from "../_types";
import { PersonalDataformSchema } from "../_types/zodSchema";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { AxiosError } from "axios";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

const Personal_Form = ({ clientId }: clientIdProps) => {
  const { data } = useGetClientsById(clientId);

  const { mutate } = useEditClient(clientId);

  const [loader, setLoader] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // State for default values
  const [defaultValues, setDefaultValues] = useState<
    z.infer<typeof PersonalDataformSchema>
  >({
    pan: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    mobileNumber: "",
    dob: "11/07/2024",
    aadhaar: "112312312321",
    din: "",
    dscInfo: "Not_Applicable",
    dscExpiry:"",
    dscVault:"",
    loginStatus: "Active",
    kycStatus: "Pending",
  });

  // Update default values when data is fetched
  useEffect(() => {
    if (data) {
      setDefaultValues((prevValues) => {
        // Only update if the data has changed to prevent unnecessary re-renders
        return prevValues !== data
          ? {
              pan: data.pan ?? "",
              firstName: data.firstName ?? "",
              lastName: data.lastName ?? "",
              email: data.email ?? "",
              gender: data.gender ?? "Male",
              mobileNumber: data.mobileNumber ?? "",
              dob: data.dob?.split("T")[0] ?? "",
              aadhaar: data.aadhaar ?? "112312312321",
              din: data.din ?? "",
              dscExpiry:data?.dscExpiry.split("T")[0] ?? "",
              dscVault:data?.dscVault,
              dscInfo: data.dscInfo ?? "None",
              loginStatus: data.loginStatus ?? "Active",
              kycStatus: data.kycStatus ?? "Pending",
            }
          : prevValues;
      });
    }
  }, [data]);

  const [showVakilgiriFields, setShowVakilgiriFields] = useState(false);

  const form = useForm<z.infer<typeof PersonalDataformSchema>>({
    resolver: zodResolver(PersonalDataformSchema),
    defaultValues,
  });

  // Reset the form whenever default values are updated
  useEffect(() => {
    if (defaultValues && form) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleDscInfoChange = (
    value: "None" | "Not_Applicable" | "With_Vakilgiri" | "With_Client"
  ) => {
    form.setValue("dscInfo", value);
    setShowVakilgiriFields(value === "With_Vakilgiri");
  };

  function onSubmit(values: z.infer<typeof PersonalDataformSchema>) {
    console.log("Valuess",values);
    setLoader(true);
    mutate(values, {
      onSuccess: () => {
        setLoader(false);
        toast.success("Client Updated Successfully.");
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      },
      onError: (error) => {
        setLoader(false);
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to create client: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  }

  if (!data) {
    return (
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
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-4xl mx-auto p-4"
      >
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
                <FormMessage/>
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
                <FormMessage/>
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
                <FormMessage/>
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
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <FormMessage/>
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
                <FormMessage/>
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
                <CustomDatePicker
                      value={field.value || ""}
                      onChange={(date) =>
                        field.onChange(
                          date ? format(new Date(date), "yyyy-MM-dd") : ""
                        )
                      }
                    />
                </FormControl>
                <FormMessage/>
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
                <FormMessage/>
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
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dscInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DSC Status</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={(value:"None" | "Not_Applicable" | "With_Vakilgiri" | "With_Client") => {
                    field.onChange(value);
                    handleDscInfoChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Not_Applicable">
                      Not Applicable
                    </SelectItem>
                    <SelectItem value="With_Vakilgiri">
                      With Vakilgiri
                    </SelectItem>
                    <SelectItem value="With_Client">With Client</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          {showVakilgiriFields && (
            <FormField
              control={form.control}
              name="dscVault"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DSC Vault</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter DIN" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          )}

          {showVakilgiriFields && (
            <FormField
              control={form.control}
              name="dscExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DSC Expiry</FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      value={field.value || ""}
                      onChange={(date) =>
                        field.onChange(
                          date ? format(new Date(date), "yyyy-MM-dd") : ""
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="loginStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kycStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KYC Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loader ? "Loding..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Personal_Form;
