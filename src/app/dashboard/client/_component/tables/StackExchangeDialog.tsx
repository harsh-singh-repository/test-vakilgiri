import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import {
  CalendarIcon,
  Plus,
  Trash2,
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useAddClientDisscussion,
  useGetClientsById,
  useAddClientReminder,
  useGetClientDisscussion,
  useDeleteClientDiscussion,
} from "@/hooks/users/manage-client";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { discussionSchema, reminderSchema } from "../../_types/zodSchema";
import { useState } from "react";
import { toast } from "sonner";
import { RxAvatar } from "react-icons/rx";
import { clientDisscussionProps } from "../../_types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface StackExchangeDialogProp {
  openDialogId: string;
  onClose: () => void;
}

export const StackExchangeDialog = ({
  onClose,
  openDialogId,
}: StackExchangeDialogProp) => {
  // const [date, setDate] = React.useState<Date>()
  const [isSubmittingDiscussion, setIsSubmittingDiscussion] = useState(false);
  const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);

  const discussionForm = useForm<z.infer<typeof discussionSchema>>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      discussion: "",
    },
  });

  const reminderForm = useForm<z.infer<typeof reminderSchema>>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      reminderType: "Call",
      dueDate: "",
      subject: "",
      body: "",
    },
  });

  console.log("Dialog ID: ", openDialogId);
  console.log(typeof openDialogId);
  const { data } = useGetClientsById(openDialogId);
  const {data:clientDisscussionData} = useGetClientDisscussion(openDialogId)

  const { mutate: addDiscussion } = useAddClientDisscussion(openDialogId);
  const { mutate: addReminder } = useAddClientReminder(openDialogId);
  const {mutate:deleteDiscussion} = useDeleteClientDiscussion()

  const queryClient = useQueryClient();


  const handleDeleteDisscussion = ( id:string ) =>{
    console.log("discussion id",id)
    // console.log("clientid id",clientId)
    deleteDiscussion(id,{
     onSuccess:()=>{
        toast.success("Disscussion Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["clientDisscussion"] });
     },
     onError:(error)=>{
      if (error instanceof AxiosError) {
        // Safely access the response data
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        // console.log("Axios Error Message:", errorMessage);

        // Display error message in toast
        toast.error(`Failed to delete Discussion: ${errorMessage}`);
      } else {
        // Handle non-Axios errors
        toast.error("An unexpected error occurred.");
      }
     }
    });
 }

  console.log("Dialog Disscussion", clientDisscussionData);

  async function onDiscussionSubmit(values: z.infer<typeof discussionSchema>) {
    setIsSubmittingDiscussion(true);
    addDiscussion(values, {
      onSuccess: () => {
        toast.success("Dissussion Submited");
        queryClient.invalidateQueries({ queryKey: ["clientDisscussion"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to submit Discussion: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
    setIsSubmittingDiscussion(false);
    console.log(values);
  }

  async function onReminderSubmit(values: z.infer<typeof reminderSchema>) {
    setIsSubmittingReminder(true);
    console.log(values);

    addReminder(values, {
      onSuccess: () => {
        toast.success("Reminders Submited");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Submit Reminder: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
    setIsSubmittingReminder(false);
  }

  return (
    <div>
      <div className="p-3">
        <div className="flex flex-col gap-y-3">
          <div className="text-[17px] text-[#091747] uppercase font-bold">
            {data?.firstName + " " + data?.lastName}
          </div>
          <div className="grid grid-rows gap-4 md:grid-rows-1 sm:grid-rows-1 lg:grid-cols-[500px,250px] xl:grid-cols-[500px,250px]">
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
                        className="space-y-1"
                      >
                        <div className="flex flex-col gap-y-4">
                          <FormField
                            control={discussionForm.control}
                            name="discussion"
                            render={({ field, fieldState: { error } }) => (
                              <div>
                                <FormControl>
                                  <Textarea
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
                            className="max-w-fit bg-red-500 hover:bg-red-600 text-white text-[12px] px-2 right-0 rounded-md"
                            disabled={isSubmittingDiscussion}
                          >
                            {isSubmittingDiscussion ? "Saving..." : "Save"}
                          </button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </AccordionContent>
                </AccordionItem>
                {clientDisscussionData && (
                  <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2">
                    {clientDisscussionData.map(
                      (discussion: clientDisscussionProps, index: number) => (
                        <div
                          className="flex flex-row gap-2 items-center bg-[#E9E9E9] rounded-md px-2 py-1 "
                          key={index}
                        >
                          <RxAvatar size={30} />
                          <div className="flex flex-col w-full">
                            <span className="font-bold">Nahar Singh</span>
                            <span className="font-medium">
                              {discussion.body}
                            </span>
                           <div className="flex flex-row justify-between w-full">
                               <div className="font-thin text-[#F21300]">
                                    {discussion.createdAt.split('T')[0]}
                                </div>
                               <div className="text-[#F21300] cursor-pointer" onClick={() => handleDeleteDisscussion(discussion.id)}>
                                  <Trash2 size={"15"}/>
                               </div>
                           </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
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
                                <Input
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
                                <Textarea
                                  placeholder="Enter description"
                                  className={cn(
                                    "min-h-[100px] bg-white border-gray-300",
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
                          className="max-w-fit bg-red-500 hover:bg-red-600 text-white text-[12px] px-2 rounded-md"
                          disabled={isSubmittingReminder}
                        >
                          {isSubmittingReminder ? "Saving..." : "Save"}
                        </button>
                       </div>
                      </form>
                    </Form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="space-y-2 bg-[#ededed] rounded-md max-h-fit">
              <div className="rounded-lg px-2 py-2">
                <div className="justify-between flex px-1">
                   <h3 className="font-semibold mb-3 text-[13px] text-[#091747]">
                      Assigned Users
                   </h3>
                   <X onClick={onClose} strokeWidth={"3"} className="text-[#f21300] cursor-pointer"/>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>PV</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="default"
                    className="h-8 w-8 bg-transparent text-[#f21300] hover:bg-transparent"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
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
                  <div className="text-[10px] bg-[#f21300] max-w-fit text-white px-2 py-1 rounded-md">
                    <span className="font-semibold">KYC Status:</span>{" "}
                    <span>Pending</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border px-2 py-2">
                <div className="bg-[#091747] rounded-md">
                  <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                    Bussiness List
                  </h3>
                </div>
                <div>
                  <div className="font-semibold text-[12px]">
                    1. KARAN (OPC) PRIVATE LIMITED
                  </div>
                  <div className="ml-3 mt-1 text-[12px]">
                    <div>
                      <span className="font-semibold">PAN:</span> {data?.pan}
                    </div>
                    <div>
                      <span className="font-semibold">Manager:</span> KARAN
                    </div>
                    <div className="text-[10px] bg-[#008827] max-w-fit text-white px-2 py-1 rounded-md">
                      <span className="font-semibold">Status:</span>{" "}
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
