import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import { format } from "date-fns";
import {
  CalendarIcon,
  PlusCircle,
  X,
  //  X
} from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

//   import { useState } from "react";
//   import { toast } from "sonner";
//   import { BusinessDiscussion } from "../../_types";

import { MaterialInput } from "@/components/material-input";
import { ReminderDiscussionSchema, reminderReminderSchema } from "./types/zodSchema";
import { useGetReminderById } from "@/hooks/reminder/manage-reminder";

interface StackExchangeDialogProp {
  openDialogId: string;
  onClose: () => void;
}

//   const formatDate = (isoString: string) => {
//     const date = new Date(isoString);

//     // Options for formatting
//     const options: Intl.DateTimeFormatOptions = {
//       month: "short", // 'Nov'
//       day: "numeric", // '18'
//       year: "numeric", // '2024'
//       hour: "numeric", // '12'
//       minute: "2-digit", // '43'
//       hour12: true, // 'AM/PM' format
//     };

//     return date.toLocaleString("en-US", options);
//   };

//   function formatCreatedAtDate(dateString: string): string {
//     const date = new Date(dateString);

//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();

//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const ampm = hours >= 12 ? 'pm' : 'am';
  
//     hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
//     const formattedHours = String(hours).padStart(2, '0');

//     return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
//   }

export const StackReminderDialog = ({
  onClose,
  openDialogId,
}: StackExchangeDialogProp) => {
  // const [date, setDate] = React.useState<Date>()

  // const queryClient = useQueryClient();

  const discussionForm = useForm<z.infer<typeof ReminderDiscussionSchema>>({
    resolver: zodResolver(ReminderDiscussionSchema),
    defaultValues: {
      discussion: "",
    },
  });

  const {data} = useGetReminderById(openDialogId);
  console.log("Remidner data",data);

  // const formMethods = useForm({
  //   defaultValues: {
  //     managersId: [] as string[], // Array to store selected manager IDs
  //   },
  // });

  const reminderForm = useForm<z.infer<typeof reminderReminderSchema>>({
    resolver: zodResolver(reminderReminderSchema),
    defaultValues: {
      reminderType: "Call",
      dueDate: "",
      subject: "",
      body: "",
    },
  });


  async function onDiscussionSubmit(values: z.infer<typeof ReminderDiscussionSchema>) {

    console.log(values);
  }

  async function onReminderSubmit(values: z.infer<typeof reminderReminderSchema>) {
     console.log(values);
  };

  // const handleFormSubmit = (data: { managersId: string[] }) => {
  //   console.log("data", data);
  //   addManager(data, {
  //     onSuccess: () => {
  //       toast.success("Manager Assigned");
  //       queryClient.invalidateQueries({ queryKey: ["bussinessId"] });
  //     },
  //     onError: (error) => {
  //       toast.error(`error : ${error}`);
  //     },
  //   });
  // };

  return (
    <div className="p-4">
      <div className="flex justify-center items-start gap-x-3">
        <div className="flex flex-col gap-y-3">
          <div className="text-[17px] text-[#091747] uppercase font-bold">
            adqeq
          </div>
          <div className="grid grid-rows gap-4 md:grid-rows-1 sm:grid-rows-1 lg:grid-cols-[500px] xl:grid-cols-[500px]">
            <div className="w-full max-w-2xl mx-auto">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="discussions" className="">
                  <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-md text-[#091747] text-[15px] font-medium">
                    <span>Discussions</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 bg-white">
                    <Form {...discussionForm}>
                      <form
                        onSubmit={discussionForm.handleSubmit(
                          onDiscussionSubmit
                        )}
                        className="space-y-2"
                      >
                        <div className="flex flex-col gap-y-4">
                          <FormField
                            control={discussionForm.control}
                            name="discussion"
                            render={({ field, fieldState: { error } }) => (
                              <div>
                                <FormControl>
                                  <MaterialInput
                                    placeholder="Enter Description"
                                    className={cn(
                                      "min-h-[60px] border-gray-300",
                                      error &&
                                        "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            )}
                          />
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="max-w-fit text-[10px] bg-[#F21300] font-thin px-[10px] rounded-md text-white"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reminders" className="mt-4">
                  <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-md text-[#091747] text-[15px] font-medium">
                    <span>Reminders</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 bg-white">
                    <Form {...reminderForm}>
                      <form
                        onSubmit={reminderForm.handleSubmit(onReminderSubmit)}
                        className="space-y-1"
                      >
                        <div className="flex space-x-4">
                          <FormField
                            control={reminderForm.control}
                            name="reminderType"
                            render={({ field, fieldState: { error } }) => (
                              <div className="w-1/2">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      className={cn(
                                        "bg-white border-gray-300",
                                        error &&
                                          "border-red-500 focus:border-red-500 focus:ring-red-500"
                                      )}
                                    >
                                      <SelectValue placeholder="Select reminder type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Call">Call</SelectItem>
                                    <SelectItem value="Follow_Up">
                                      Follow Up
                                    </SelectItem>
                                    <SelectItem value="WhatsApp">
                                      WhatsApp
                                    </SelectItem>
                                    <SelectItem value="Email">Email</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          />

                          <FormField
                            control={reminderForm.control}
                            name="dueDate"
                            render={({ field, fieldState: { error } }) => (
                              <div className="flex flex-col w-1/2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full justify-start text-left font-normal bg-white border-gray-300",
                                          !field.value &&
                                            "text-muted-foreground",
                                          error &&
                                            "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        )}
                                      >
                                        <CalendarIcon
                                          className="mr-2 h-4 w-4"
                                          aria-hidden="true"
                                        />
                                        {field.value
                                          ? format(
                                              new Date(field.value),
                                              "dd-MM-yyyy"
                                            )
                                          : "Select date"}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}
                          />
                        </div>

                        <FormField
                          control={reminderForm.control}
                          name="subject"
                          render={({ field, fieldState: { error } }) => (
                            <div>
                              <FormControl>
                                <MaterialInput
                                  placeholder="Subject"
                                  className={cn(
                                    "bg-white border-gray-300",
                                    error &&
                                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={reminderForm.control}
                          name="body"
                          render={({ field, fieldState: { error } }) => (
                            <div>
                              <FormControl>
                                <MaterialInput
                                  placeholder="Enter description"
                                  className={cn(
                                    "min-h-[60px] bg-white border-gray-300",
                                    error &&
                                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <div className="justify-end flex">
                          <button
                            type="submit"
                            className="max-w-fit text-[10px] bg-[#F21300] font-thin px-[10px] rounded-md text-white"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </Form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
          </div>
        </div>
        <div className="space-y-2 bg-[#ededed] rounded-md max-h-fit">
              <div className="rounded-lg px-2 py-1">
              <div className="justify-between flex px-1">
                   <h3 className="font-semibold mb-3\1 text-[13px] text-[#091747]">
                      Assigned Users
                   </h3>
                   <X onClick={onClose} strokeWidth={"3"} className="text-[#f21300] cursor-pointer"/>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>PV</AvatarFallback>
                  </Avatar>
                  <Popover>
                    <PopoverTrigger>
                    <div className="text-[#f21300]">
                          <PlusCircle />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                          efjwenf
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="rounded-lg px-2 py-2">
                <div className="bg-[#091747] rounded-md">
                  <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                    Client Details
                  </h3>
                </div>
                <div className="">
                  <div className="text-[12px]">
                    <span className="font-semibold">NGO:</span>{" "}
                    {/* {data?.creator.firstName + " " + data?.creator.lastName} */}
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Mobile:</span> 9662391342
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Email:</span>{" "}
                    {data?.creator?.email}
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Manager:</span> DEV
                  </div>
                  <div className="text-[10px] bg-[#A301D5] max-w-fit text-white px-2 py-1 rounded-md mt-1">
                    <span className="font-normal">{data?.businessType}</span>
                  </div>
                  <div className="text-[10px] bg-[#A0A0A0] max-w-fit text-white px-2 py-1 rounded-md mt-1">
                    <span className="font-semibold">NGO Status:</span>{" "}
                    <span>Pending</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg px-2 py-2">
                <div className="bg-[#091747] rounded-md">
                  <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                    Bussiness List
                  </h3>
                </div>
                <div className="">
                  <div className="text-[12px]">
                    <span className="font-semibold">Client:</span>{" "}
                    {data?.firstName + " " + data?.lastName}
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Mobile:</span> 9662391342
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Email:</span>{" "}
                    {data?.creator?.email}
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Manager:</span> DEV
                  </div>
                  <div className="text-[10px] bg-[#FAB515] max-w-fit text-white px-2 py-1 rounded-md mt-1">
                    <span className="font-semibold">KYC Status:</span>{" "}
                    <span>Pending</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border px-2 py-2">
                <div className="bg-[#091747] rounded-md">
                  <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                    Creator Details
                  </h3>
                </div>
                <div className="">
                  <div className="text-[12px]">
                    <span className="font-semibold">Creator</span>{" "}
                    {data?.creator?.firstName + " " + data?.creator?.lastName}
                  </div>
                  <div className="text-[12px]">
                    <span className="font-semibold">Created On</span>{" "}
                    {/* {formattedDate} */}
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};
