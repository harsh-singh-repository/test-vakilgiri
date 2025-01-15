import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import {
  PlusCircle,
  // PlusCircle,
  Trash2,
  X,
  //  X
} from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Profile from "../../../../../../public/assets/profileimg.png";
import { cn } from "@/lib/utils";
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
import {
  useAddClientDisscussion,
  useGetClientsById,
  useAddClientReminder,
  useGetClientDisscussion,
  useDeleteClientDiscussion,
  useGetClientReminder,
  useAddClientManager,
  useRemoveManager,
} from "@/hooks/clients/manage-client";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { discussionSchema, reminderSchema } from "../../_types/zodSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RxAvatar } from "react-icons/rx";
import { clientDisscussionProps, ClinetBussinessDetails } from "../../_types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ClientReminderType,
  Manager
} from "@/app/dashboard/(sales)/leads/_types";
// import { useGetUsers } from "@/hooks/user/manage-user";
import { useDeleteClientReminder } from "@/hooks/tickets/manage-ticket";
// import { useAddManager } from "@/hooks/business/manage-business";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUsers } from "@/hooks/user/manage-user";
import { MaterialInput } from "@/components/material-input";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";
import { RotatingLines } from "react-loader-spinner";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StackExchangeDialogProp {
  openDialogId: string;
  onClose: () => void;
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function formatCreatedAtDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
  const formattedHours = String(hours).padStart(2, "0");

  return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
}

export const StackExchangeDialog = ({
  onClose,
  openDialogId,
}: StackExchangeDialogProp) => {
  // const [date, setDate] = React.useState<Date>()
  const [isSubmittingDiscussion, setIsSubmittingDiscussion] = useState(false);
  const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);
  const [storedManager,setStoredManager] = useState<string[]>();

  const router = useRouter();

  const discussionForm = useForm<z.infer<typeof discussionSchema>>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      discussion: "",
    },
  });

  const formMethods = useForm({
    defaultValues: {
      managersId: [] as string[], // Array to store selected manager IDs
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
  const { data: clientDisscussionData } = useGetClientDisscussion(openDialogId);
  const { data: ClientReminder } = useGetClientReminder(openDialogId);

  const { mutate: addDiscussion } = useAddClientDisscussion(openDialogId);
  const { mutate: addReminder } = useAddClientReminder(openDialogId);
  const { mutate: deleteDiscussion } = useDeleteClientDiscussion();
  const { data: assignedManager } = useGetUsers();
  const { mutate: deleteReminder } = useDeleteClientReminder();
  const {mutate:removeManger} = useRemoveManager(openDialogId)
  const { mutate: addManager } = useAddClientManager(openDialogId);

  const queryClient = useQueryClient();
  console.log("clientid id", data);

  const handleDeleteDisscussion = (id: string) => {
    console.log("discussion id", id);
    deleteDiscussion(id, {
      onSuccess: () => {
        toast.success("Disscussion Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["clientDisscussion"] });
      },
      onError: (error) => {
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
      },
    });
  };

  const handleDeleteRemider = (id: string) => {
    deleteReminder(id, {
      onSuccess: () => {
        toast.success("Reminder Deleted");
        queryClient.invalidateQueries({ queryKey: ["clientReminder"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to delete Reminder: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  const handleFormSubmit = (data: { managersId: string[] }) => {
    console.log("data", data);
    addManager(data, {
      onSuccess: () => {
        toast.success("Manager Assigned");
        queryClient.invalidateQueries({ queryKey: ["clientsId"] });
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      },
      
      onError: (error) => {
        toast.error(`error : ${error}`);
      },
    });
  };

  console.log("Dialog Disscussion", clientDisscussionData); 
  console.log("Dialog Disscussion", ClientReminder); 

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
        queryClient.invalidateQueries({ queryKey: ["clientReminder"] });
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

  const handleRemoveManager = (id: { managerId: string }) => {
    removeManger(id, {
      onSuccess: () => {
        toast.success("Manager Removed");
        queryClient.invalidateQueries({ queryKey: ["clientsId"] });
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Error: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  useEffect(()=>{
    const managerId = data?.managers.map((item:{id:string})=> item.id);
    setStoredManager(managerId);
  },[data])

  if (!data) {
    return (
      <div className="flex justify-center item center p-2 h-full">
        <RotatingLines
          visible={true}
          height="50"
          width="50"
          strokeColor="#f21300"
          strokeWidth="2"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="p-2 flex items-start gap-x-2">
        <div className="flex flex-col gap-y-2">
          <div className="text-[17px] text-[#091747] font-bold">
            {data?.firstName + " " + data?.lastName}
          </div>
          <div className="grid grid-rows gap-4 md:grid-rows-1 sm:grid-rows-1">
            <div className="w-full lg:w-[630px] mx-auto">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="discussions" className="">
                  <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-md text-[#091747] text-[15px] font-medium">
                    <span className="font-semibold text-[15px]">
                      Discussions
                    </span>
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
                  <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2 mb-2">
                    {clientDisscussionData.map(
                      (discussion: clientDisscussionProps, index: number) => (
                        <div
                          className="flex flex-row gap-2 items-center bg-[#E9E9E9] rounded-md px-2 py-1 "
                          key={index}
                        >
                           <Image height={"30"} width={"30"} alt="avatar" src={Profile}/>
                          <div className="flex flex-col w-full">
                            <span className="font-bold">Nahar Singh</span>
                            <span className="font-medium">
                              {discussion.body}
                            </span>
                            <div className="flex flex-row justify-between w-full">
                              <div className="font-thin text-[#F21300]">
                                {discussion.createdAt.split("T")[0]}
                              </div>
                              <div
                                className="text-[#F21300] cursor-pointer"
                                onClick={() =>
                                  handleDeleteDisscussion(discussion.id)
                                }
                              >
                                <Trash2 size={"15"} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                <AccordionItem value="reminders" className="">
                  <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-md text-[#091747] text-[15px] font-medium">
                    <span className="font-semibold text-[15px]">Reminders</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 bg-white">
                    <Form {...reminderForm}>
                      <form
                        onSubmit={reminderForm.handleSubmit(onReminderSubmit)}
                        className="space-y-2"
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
                                          "border-[#f32100] focus:border-[#f32100] focus:ring-[#f32100]"
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
                                <CustomDatePicker
                                  value={field.value || ""}
                                  onChange={(date) =>
                                    field.onChange(
                                      date
                                        ? format(new Date(date), "yyyy-MM-dd")
                                        : ""
                                    )
                                  }
                                />
                                {error && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {error.message}
                                  </p>
                                )}
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

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="max-w-fit text-[10px] bg-[#F21300] font-thin px-[10px] rounded-md text-white"
                            disabled={isSubmittingReminder}
                          >
                            {isSubmittingReminder ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </form>
                    </Form>
                  </AccordionContent>
                </AccordionItem>
                {ClientReminder && (
                  <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2">
                    {ClientReminder.map(
                      (reminder: ClientReminderType, index: number) => (
                        <div
                          className="flex flex-row gap-2 bg-[#E9E9E9] rounded-md px-2 py-1 "
                          key={index}
                        >
                          <RxAvatar size={30} />
                          <div className="flex flex-col w-full items-start">
                            <div className="flex flex-col text-left w-full">
                              <span className="font-semibold">
                                {reminder.creator?.firstName +
                                  " " +
                                  reminder.creator?.lastName}
                              </span>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">Subject:</span>
                                <span>{reminder?.subject}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">
                                  Description:
                                </span>
                                <span>{reminder?.body}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">
                                  Reminder Type:
                                </span>
                                <span>{reminder?.reminderType}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">Due Date:</span>
                                <span>{formatDate(reminder?.dueDate)}</span>
                              </div>
                              <div className="flex justify-between text-[#f21300] w-full">
                                <span>
                                  {formatCreatedAtDate(reminder?.createdAt)}
                                </span>
                                <Trash2
                                  size={"15"}
                                  onClick={() =>
                                    handleDeleteRemider(reminder?.id)
                                  }
                                  className="cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="space-y-2 bg-[#ededed] w-[230px] rounded-2xl max-h-fit">
          <div className="rounded-lg px-2 py-1">
            <div className="justify-between flex px-1 pt-1">
              <h3 className="font-bold mb-3 text-[13px] text-[#091747]">
                Assigned Manager
              </h3>
              <X
                onClick={onClose}
                strokeWidth={"5"}
                size={20}
                className="text-[#f21300] cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              {data && (
                      <div className="flex">
                        {data?.managers?.map(
                          (manager: Manager, index: number) => (
                            <div className="" key={index}>
                        <Image
                          alt="profile"
                          src={Profile}
                          height="40"
                          width="40"
                          className="rounded-full mr-2"
                          style={{
                            boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                        <div className="absolute">
                          <X
                            className="text-[#f21300] -translate-y-9 translate-x-8 h-3 w-3 cursor-pointer"
                            strokeWidth={"6"}
                            onClick={() =>
                              handleRemoveManager({ managerId:manager?.id})
                            }
                          />
                        </div>
                      </div>
                          )
                        )}
                      </div>
                    )}
              <Popover>
                <PopoverTrigger>
                  <div className="text-[#f21300]">
                    <PlusCircle />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {assignedManager && (
                    <form onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
                      <div>
                        {assignedManager.filter((item:Manager)=> !storedManager?.includes(item.id)).map((manager: Manager, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Controller
                                name="managersId"
                                control={formMethods.control}
                                render={({ field: { value, onChange } }) => (
                                  <input
                                    type="checkbox"
                                    checked={value?.includes(manager.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        // Add manager ID to the array
                                        onChange([...value, manager.id]);
                                      } else {
                                        // Remove manager ID from the array
                                        onChange(
                                          value.filter(
                                            (id: string) => id !== manager.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                )}
                              />
                              <span className="text-[12px] text-[#091747] font-semibold">
                                {manager.adminStaff?.user.firstName + " "  + manager.adminStaff?.user.lastName}
                              </span>
                            </div>
                          ))}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-2 bg-[#f21300] px-2 py-1 rounded-md text-[10px] text-white"
                      >
                        Assign
                      </button>
                    </form>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="rounded-lg">
            <div className="bg-[#091747] rounded-xl w-[215px] ml-1">
              <h3 className="font-medium text-[12px] bg-navy-900 text-white px-[10px] py-[5px]">
                Client Details
              </h3>
            </div>
            <div className="text-[#091747] mt-1 w-full px-2">
              <div className="text-[12px] ">
                <span className="font-bold">Client:</span>{" "}
                <span className="font-medium">
                  {data?.firstName + " " + data?.lastName}
                </span>
              </div>
              <div className="text-[12px] ">
                <span className="font-bold">Mobile:</span>{" "}
                <span className="font-medium">{data?.mobileNumber}</span>
              </div>
              <div className="text-[12px] ">
                <span className="font-bold">Email:</span>{" "}
                <span className="font-medium">{data?.email}</span>
              </div>
              <div className="text-[12px] ">
                <span className="font-bold">Manager:</span>{" "}
                <span className="font-medium">{}</span>
              </div>
              <div className="text-[10px] bg-[#f21300] max-w-fit text-white px-2 max-h-fit mt-1 rounded-full">
                <span className="font-bold">KYC Status:</span>{" "}
                <span className="font-medium">{data?.kycStatus}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border py-2">
            <div className="bg-[#091747] rounded-xl w-[215px] ml-1">
              <h3 className="font-medium text-[12px] bg-navy-900 text-white px-[10px] py-[5px]">
                Bussiness List
              </h3>
            </div>
            <div className="text-[#091747] mt-1 w-full px-2">
              {data?.businessesAsMember.map((bussiness:ClinetBussinessDetails, index: number) => {
                return (
                  <div key={index} className="mt-1">
                    <div className="font-bold text-[12px] leading-none">
                      {bussiness?.businessName}
                    </div>
                    <div className="text-[12px]">
                      <div className="leading-tight">
                        <span className="font-bold">PAN:</span>{" "}
                        <span className="font-medium">{bussiness?.businessPan}</span>
                      </div>
                      <div className="leading-tight">
                        <span className="font-bold">Manager:</span>{" "}
                        <span className="font-medium"></span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <div className="text-[10px] bg-[#008827] max-w-fit max-h-fit text-white px-2 rounded-full mt-1">
                          <span className="font-semibold">Status:</span>{" "}
                          <span>Active</span>
                        </div>
                        <FaRegEye className="text-[#091747] h-4 w-4 cursor-pointer" onClick={()=> router.push(`/dashboard/business/${bussiness?.id}`)}/>
                      </div>
                      <div className="border-b border-dashed border-1 border-[#091747] mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
