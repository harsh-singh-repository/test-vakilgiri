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
  Trash2,
  X,
  //  X
} from "lucide-react";

import { Controller, useForm } from "react-hook-form";
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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//   import { RxAvatar } from "react-icons/rx";
import Profile from "../../../../../../../public/assets/profileimg.png";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddLeadsDiscussion,
  useAddLeadsReminder,
  useAddManager,
  useDeleteLeadsDisscussion,
  useDeleteLeadsReminder,
  useGetLeadsById,
  useGetLeadsDisscussion,
  useGetLeadsReminder,
  useRemoveLeadManager,
} from "@/hooks/leads/manage-leads";
import {
  leadsDiscussionSchema,
  leadsReminderSchema,
} from "../../_types/zodSchema";
// import { MdEdit } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import {
  LeadsDiscussionType,
  LeadsReminderType,
  managerDetails,
  userType,
} from "../../_types";
import { AxiosError } from "axios";
import EditLeads from "../EditLeads";
import LinkClient from "../LinkClient";
import LinkBussiness from "../LinkBussiness";
import { useGetUsers } from "@/hooks/user/manage-user";
import { MaterialInput } from "@/components/material-input";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";
import { FaPencilAlt, FaPlus } from "react-icons/fa";

interface StackExchangeDialogProp {
  openDialogId: string;
  onClose: () => void;
  // setOpen: (open: boolean) => void;
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

export const StackLeadsExchangeDialog = ({
  onClose,
  openDialogId,
}: StackExchangeDialogProp) => {
  // const [date, setDate] = React.useState<Date>()
  //   const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);

  const queryClient = useQueryClient();

  const discussionForm = useForm<z.infer<typeof leadsDiscussionSchema>>({
    resolver: zodResolver(leadsDiscussionSchema),
    defaultValues: {
      discussion: "",
    },
  });

  const reminderForm = useForm<z.infer<typeof leadsReminderSchema>>({
    resolver: zodResolver(leadsReminderSchema),
    defaultValues: {
      reminderType: "Call",
      dueDate: "",
      subject: "",
      body: "",
    },
  });

  console.log("Dialog ID: ", openDialogId);
  console.log(typeof openDialogId);

  const { data } = useGetLeadsById(openDialogId);

  const { data: assignedManager } = useGetUsers();

  console.log("manager", assignedManager);

  const { data: LeadDiscussion } = useGetLeadsDisscussion(openDialogId);

  const { data: LeadReminder } = useGetLeadsReminder(openDialogId);

  const { mutate: addManager } = useAddManager(openDialogId);

  const { mutate: addDisscussion } = useAddLeadsDiscussion(openDialogId);

  const { mutate: deleteDisscussion } = useDeleteLeadsDisscussion();

  const { mutate: addReminder } = useAddLeadsReminder(openDialogId);

  const { mutate: deleteReminder } = useDeleteLeadsReminder(openDialogId);

  const { mutate: removeManger } = useRemoveLeadManager(openDialogId);

  console.log("Data of leads", data);

  const handleDeleteDisscussion = ({
    leadId,
    id,
  }: {
    leadId: string;
    id: string;
  }) => {
    deleteDisscussion(
      { leadId, id },
      {
        onSuccess: () => {
          toast.success("Disscussion Delted Successfully");
          queryClient.invalidateQueries({ queryKey: ["bussinessDisscussion"] });
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
      }
    );
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id, {
      onSuccess: () => {
        toast.success("Reminder Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["leadsReminder"] });
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

  async function onDiscussionSubmit(
    values: z.infer<typeof leadsDiscussionSchema>
  ) {
    console.log("Discussion", values);
    addDisscussion(values, {
      onSuccess: () => {
        toast.success("Leads Discussion added");
        queryClient.invalidateQueries({ queryKey: ["leadsDisscussion"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to add Discussion: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  }

  async function onReminderSubmit(values: z.infer<typeof leadsReminderSchema>) {
    addReminder(values, {
      onSuccess: () => {
        toast.success(`Added Reminder Successfully`);
        queryClient.invalidateQueries({ queryKey: ["leadsReminder"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to add reminder: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  }

  const formMethods = useForm({
    defaultValues: {
      managerId: [] as string[], // Array to store selected manager IDs
    },
  });

  const handleFormSubmit = (data: { managerId: string[] }) => {
    console.log("data", data);
    addManager(data, {
      onSuccess: () => {
        toast.success("Manager Assigned");
        queryClient.invalidateQueries({ queryKey: ["leadId"] });
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Assign manager: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  const handleRemoveManager = (id: string) => {
    console.log("ID", id);
    removeManger(id, {
      onSuccess: () => {
        toast.success("Manager Removed");
        queryClient.invalidateQueries({ queryKey: ["leadId"] });
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      },
      onError: (error) => {
        console.log("ID", id);
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Remove manager: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

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
      <div className="max-h-fit p-2">
        <div className="flex flex-col gap-y-3">
          <div className="grid grid-rows gap-4 md:grid-rows-1 sm:grid-rows-1 lg:grid-cols-2 xl:grid-cols-[650px,230px]">
            <div className="w-full">
              <div className="text-[17px] text-[#091747] text-left font-bold">
                {data?.service?.replace(/_/g, " ")}
              </div>
              <Accordion type="multiple" className="mt-2">
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
                                    placeholder="Enter Discussion"
                                    className={cn(
                                      "min-h-[60px] border-gray-300 focus:border-blue-500",
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
                {LeadDiscussion && (
                  <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2 mb-2">
                    {LeadDiscussion.map(
                      (discussion: LeadsDiscussionType, index: number) => (
                        <div
                          className="flex flex-row gap-2 bg-[#E9E9E9] rounded-md px-2 py-1 "
                          key={index}
                        >
                          <RxAvatar size={30} />
                          <div className="flex flex-col w-full items-start">
                            <div className="flex flex-col text-left">
                              <span className="font-bold">Nahar Singh</span>
                              <span className="font-medium">
                                {discussion.body}
                              </span>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                              <div className="font-thin text-[#F21300]">
                                {discussion.createdAt.split("T")[0]}
                              </div>
                              <div
                                className="text-[#F21300] cursor-pointer"
                                onClick={() =>
                                  handleDeleteDisscussion({
                                    leadId: discussion.leadId,
                                    id: discussion.id,
                                  })
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
                                    "bg-white border-gray-300 focus:border-blue-500",
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
                                    "min-h-[60px] bg-white border-gray-300 focus:border-blue-500",
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
                {LeadReminder && (
                  <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2">
                    {LeadReminder.map(
                      (reminder: LeadsReminderType, index: number) => (
                        <div
                          className="flex flex-row gap-2 bg-[#E9E9E9] rounded-md px-2 py-1 "
                          key={index}
                        >
                          <RxAvatar size={30} />
                          <div className="flex flex-col w-full items-start">
                            <div className="flex flex-col text-left w-full">
                              <span className="font-semibold">
                                {reminder.creator.firstName +
                                  " " +
                                  reminder.creator.lastName}
                              </span>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">Subject:</span>
                                <span>{reminder.subject}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">
                                  Description:
                                </span>
                                <span>{reminder.body}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">
                                  Reminder Type:
                                </span>
                                <span>{reminder.reminderType}</span>
                              </div>
                              <div className="flex gap-x-1">
                                <span className="font-semibold">Due Date:</span>
                                <span>{formatDate(reminder.dueDate)}</span>
                              </div>
                              <div className="flex justify-between text-[#f21300] w-full">
                                <span>
                                  {formatCreatedAtDate(reminder.createdAt)}
                                </span>
                                <Trash2
                                  size={"15"}
                                  onClick={() =>
                                    handleDeleteReminder(reminder?.id)
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
            
              <div className="bg-[#EDEDED] rounded-lg shadow text-sm">
                {/* Assigned Users Section */}
                <div className="px-2">
                  <div className="flex items-center justify-between mt-1">
                    <h2 className="font-bold text-[13px] text-[#091747]">
                      Assigned Manager
                    </h2>
                    <X
                      onClick={onClose}
                      strokeWidth={"5"}
                      size={20}
                      className="text-[#f21300] cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-2 mt-2 mb-2 items-center">
                    {data && (
                      <div className="flex">
                        {data?.assigned?.map(
                          (assign: managerDetails, index: number) => (
                            <div className="" key={index}>
                              <Image
                                alt="profile"
                                src={Profile}
                                height="30"
                                width="30"
                                className="rounded-full mr-2"
                                style={{
                                  boxShadow:
                                    "10px 10px 15px -3px rgba(0, 0, 0, 0.2)",
                                }}
                              />
                              <div className=" w-full justify-start items-center">
                                <X
                                  className="text-[#f21300] -translate-y-8 translate-x-5 h-3 w-3 cursor-pointer"
                                  strokeWidth={"6"}
                                  onClick={() =>
                                    handleRemoveManager(assign?.id)
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
                          <form
                            onSubmit={formMethods.handleSubmit(
                              handleFormSubmit
                            )}
                          >
                            <div>
                              {assignedManager
                                .filter(
                                  (manager: userType) =>
                                    manager.userRoles === "Staff_Manager"
                                ) // Filter the managers
                                .map((manager: userType, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <Controller
                                      name="managerId"
                                      control={formMethods.control}
                                      render={({
                                        field: { value, onChange },
                                      }) => (
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
                                                  (id: string) =>
                                                    id !== manager.id
                                                )
                                              );
                                            }
                                          }}
                                        />
                                      )}
                                    />
                                    <span className="text-[12px] text-[#091747] font-semibold">
                                      {manager.firstName}
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

                {/* Lead Details Section */}
                <div className="px-1">
                  <div className="flex item-center gap-x-1 pr-2">
                    <div className="flex items-center justify-between w-full px-2 py-1 bg-[#091747] text-white rounded-xl">
                      <span className="font-medium text-[13px]">
                        Lead Details
                      </span>
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <FaPencilAlt className="text-white bg-[#f21300] rounded-md h-5 w-5 p-1" />
                      </PopoverTrigger>
                      <PopoverContent className="max-w-fit">
                        <EditLeads leadId={openDialogId} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="p-1 text-[12px] text-[#091747]">
                    <div className="flex">
                      <span className="font-bold">Name:</span>
                      <span className="font-medium">
                        {data?.firstName + " " + data?.lastName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">Mobile:</span>
                      <span className="font-medium">{data?.mobile}</span>
                    </div>
                    <div className="flex text-[#ECECEC]">
                      <span className="font-bold">Email:</span>
                      <span className="font-medium">{data?.email}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">Service:</span>
                      <span className="font-medium">
                        {data?.service?.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="flex ">
                      <span className="font-bold">Value:</span>
                      <span className="font-medium">{data?.value}</span>
                    </div>
                    <div className="flex ">
                      <span className="font-bold">Existing:</span>
                      <span>{data?.existing === true ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex  items-center text-white bg-[#7F7E7E] max-w-fit rounded-full px-2 text-[10px]">
                      <span className="font-semibold">Status: </span>
                      <span className="font-semibold">{data?.status}</span>
                    </div>
                  </div>
                </div>

                {/* Client Details Section */}
                <div className="px-1 mt-2">
                  <div className="flex items-center gap-x-1 pr-2">
                    <div className="flex items-center justify-between w-full px-2 py-1 bg-[#091747] text-white rounded-xl">
                      <span className="font-medium text-[13px]">
                        Client Details
                      </span>
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <FaPlus className="text-white bg-[#f21300] rounded-md h-5 w-5 p-1" />
                      </PopoverTrigger>
                      <PopoverContent className="px-2 py-2">
                        <LinkClient leadId={openDialogId} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="p-1 text-[12px] text-[#091747]">
                    <div className="flex">
                      <span className="font-bold">Name:</span>
                      <span className="font-medium">
                        {data?.client?.firstName + " " + data?.client?.lastName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">PAN:</span>
                      <span className="uppercase font-medium">
                        {data?.client?.pan}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">Email:</span>
                      <span className="font-medium">{data?.client?.email}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">Mobile:</span>
                      <span className="font-medium">
                        {data?.client?.mobileNumber}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold">Manager:</span>
                      <span className="font-medium">DSC Registration</span>
                    </div>
                    <div className="flex  items-center text-white bg-[#f21300] max-w-fit rounded-full px-2 text-[10px]">
                      <span className="font-semibold">KYC status: </span>
                      <span className="font-semibold">Incomplete</span>
                    </div>
                  </div>
                </div>

                {/* Business Details Section */}
                <div className="px-1 mt-2">
                  <div className="flex items-center gap-x-1 pr-2">
                    <div className="flex items-center justify-between w-full px-2 py-1 bg-[#091747] text-white rounded-xl">
                      <span className="font-medium text-[13px]">
                        Bussiness Details
                      </span>
                    </div>
                    <Popover>
                      <PopoverTrigger>
                      <FaPlus className="text-white bg-[#f21300] rounded-md h-5 w-5 p-1" />
                      </PopoverTrigger>
                      <PopoverContent className="">
                        <LinkBussiness
                          clientId={data?.clientId}
                          leadId={openDialogId}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="text-[12px]">
                    <div className="flex gap-x-1 pr-2">
                      <span className="font-semibold">Business:</span>
                      <span className="uppercase">
                        {data?.business?.businessName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Manager:</span>
                    </div>
                    <div className="flex flex-col gap-y-1 ]">
                      <div className="flex  items-center text-white bg-[#A301D5] max-w-fit rounded-full px-2 text-[10px]">
                        <span className="font-medium">
                          {data?.business?.businessType}
                        </span>
                      </div>
                      <div className="flex gap-x-2 items-center text-white bg-[#f21300] max-w-fit rounded-full px-2 text-[10px] mb-2">
                        <span className="font-semibold">Bussiness status:</span>
                        <span className="font-medium">
                          {data?.business?.businessStatus}
                        </span>
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
