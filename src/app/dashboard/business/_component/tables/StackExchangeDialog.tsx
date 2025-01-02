import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Profile from "../../../../../../public/assets/profileimg.png";
import { format } from "date-fns";
import {
  CalendarIcon,
  PlusCircle,
  Trash2,
  X,
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
import { Button } from "@/components/ui/button";
import {
  useAddBusinessDisscussion,
  useAddBusinessReminder,
  useAddManager,
  useDeleteBussinessDisscussion,
  useDeleteBussinessReminder,
  useGetBussinessById,
  useGetBussinessDisscussion,
  useGetBussinessReminder,
  useRemoveManager,
} from "@/hooks/business/manage-business";
import { discussionSchema, reminderSchema } from "../../_types/zodSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BusinessDiscussion } from "../../_types";

import { RxAvatar } from "react-icons/rx";
import { useQueryClient } from "@tanstack/react-query";
import {
  bussinessReminderType,
  Manager,
  managerDetails,
} from "@/app/dashboard/(sales)/leads/_types";
import { MaterialInput } from "@/components/material-input";
import { useGetUsers } from "@/hooks/user/manage-user";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";

interface StackExchangeDialogProp {
  openDialogId: string;
  onClose: () => void;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // 'Nov'
    day: "numeric", // '18'
    year: "numeric", // '2024'
    hour: "numeric", // '12'
    minute: "2-digit", // '43'
    hour12: true, // 'AM/PM' format
  };

  return date.toLocaleString("en-US", options);
};

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

export const StackBussinessExchangeDialog = ({
  onClose,
  openDialogId,
}: StackExchangeDialogProp) => {
  const [isSubmittingDiscussion, setIsSubmittingDiscussion] = useState(false);
  const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);
  const [storedManager,setStoredManager] = useState<string[]>();



  const queryClient = useQueryClient();

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
  const { data } = useGetBussinessById(openDialogId);
  console.log("Bissiwnefkwnef", data);

  const { data: bussinessDisscussionData } =
    useGetBussinessDisscussion(openDialogId);

  const { data: businessReminderData } = useGetBussinessReminder(openDialogId);
  const { mutate } = useAddBusinessDisscussion(openDialogId);
  const { mutate: addReminder } = useAddBusinessReminder(openDialogId);
  const { mutate: removeManger } = useRemoveManager(openDialogId);
  const { mutate: deleteDisscussion } = useDeleteBussinessDisscussion();
  const { data: assignedManager } = useGetUsers();
  const { mutate: deleteReminder } = useDeleteBussinessReminder(openDialogId);
  const { mutate: addManager } = useAddManager(openDialogId);


  useEffect(()=>{
    const storedManagerID =  data?.managers?.map((manager:{id:string})=> manager.id);
    setStoredManager(storedManagerID);
  },[data]);


  const handleDeleteDisscussion = ({
    id,
    bussinessId,
  }: {
    id: string;
    bussinessId: string;
  }) => {
    deleteDisscussion(
      { id, bussinessId },
      {
        onSuccess: () => {
          toast.success("Disscussion Delted Successfully");
          queryClient.invalidateQueries({ queryKey: ["bussinessDisscussion"] });
        },
        onError: (error) => {
          toast.error(`Dissussion not Submited : ${error}`);
        },
      }
    );
  };
  const handleDeleteReminder = (id: string) => {
    deleteReminder(id, {
      onSuccess: () => {
        toast.success("Reminder deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["bussinessReminder"] });
      },
      onError: (error) => {
        toast.error(`Dissussion not Submited : ${error}`);
      },
    });
  };

  console.log("Dialog Data", data);

  const formattedDate = formatDate(data?.createdAt);

  async function onDiscussionSubmit(values: z.infer<typeof discussionSchema>) {
    setIsSubmittingDiscussion(true);
    mutate(values, {
      onSuccess: () => {
        toast.success("Dissussion Submited");
        queryClient.invalidateQueries({ queryKey: ["bussinessDisscussion"] });
        discussionForm.reset();
      },
      onError: (error) => {
        toast.error(`Dissussion not Submited : ${error}`);
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
        toast.success("Reminder Submited");
        queryClient.invalidateQueries({ queryKey: ["bussinessReminder"] });
      },
      onError: (error) => {
        toast.error(`Reminder not Submited : ${error}`);
      },
    });
    setIsSubmittingReminder(false);
  }

  const handleFormSubmit = (data: { managersId: string[] }) => {
    console.log("data", data);
    addManager(data, {
      onSuccess: () => {
        toast.success("Manager Assigned");
        queryClient.invalidateQueries({ queryKey: ["bussinessId"] });
        queryClient.invalidateQueries({ queryKey: ["bussiness"] });
      },
      onError: (error) => {
        toast.error(`error : ${error}`);
      },
    });
  };

  const handleRemoveManager = (id: { managerId: string }) => {
    removeManger(id, {
      onSuccess: () => {
        toast.success("Manager Removed");
        queryClient.invalidateQueries({ queryKey: ["bussinessId"] });
        queryClient.invalidateQueries({ queryKey: ["bussiness"] });
      },
      onError: (error) => {
        toast.error(`error : ${error}`);
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
    <div className="p-2">
      {/* <div className="flex items-start"> */}
      {/* <div className="flex flex-col gap-y-2"> */}

      <div className="grid grid-rows gap-2 md:grid-rows-1 sm:grid-rows-1 lg:grid-cols-2 xl:grid-cols-[650px,230px]">
        <div className="w-full">
          <div className="text-[17px] text-[#091747] font-bold">
            {data?.businessName}
          </div>
          <Accordion type="multiple" className="w-full mt-2">
            <AccordionItem value="discussions" className="">
              <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-md text-[#091747]">
                <span className="font-semibold text-[15px]">Discussions</span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 bg-white">
                <Form {...discussionForm}>
                  <form
                    onSubmit={discussionForm.handleSubmit(onDiscussionSubmit)}
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
            {bussinessDisscussionData && (
              <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2 mb-2">
                {bussinessDisscussionData.map(
                  (discussion: BusinessDiscussion, index: number) => (
                    <div
                      className="flex flex-row gap-2 items-center bg-[#E9E9E9] rounded-md px-2 py-1 "
                      key={index}
                    >
                      <RxAvatar size={30} />
                      <div className="flex flex-col w-full">
                        <span className="font-bold">Nahar Singh</span>
                        <span className="font-medium">{discussion.body}</span>
                        <div className="flex flex-row justify-between w-full">
                          <div className="font-thin text-[#F21300]">
                            {discussion.createdAt}
                          </div>
                          <div
                            className="text-[#F21300] cursor-pointer"
                            onClick={() =>
                              handleDeleteDisscussion({
                                id: discussion.id,
                                bussinessId: discussion.businessId,
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
                                      !field.value && "text-muted-foreground",
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
                        disabled={isSubmittingReminder}
                      >
                        {isSubmittingReminder ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
            {businessReminderData && (
              <div className="flex flex-col gap-2 w-full text-[#091747] text-[12px] mt-2">
                {businessReminderData.map(
                  (reminder: bussinessReminderType, index: number) => (
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
                            <span className="font-semibold">Description:</span>
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
                              onClick={() => handleDeleteReminder(reminder?.id)}
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
        <div className="space-y-2 bg-[#ededed] rounded-2xl w-[230px] max-h-fit">
          <div className="rounded-lg px-2">
            <div className="justify-between flex mt-2">
              <h3 className="font-bold mb-3 text-[13px] text-[#091747]">
                Assigned Users
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
                    (data: managerDetails, index: number) => (
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
                              handleRemoveManager({ managerId: data?.id })
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
                        {assignedManager.filter((manager:Manager) => !storedManager?.includes(manager.id))
                          .map((manager: Manager, index: number) => (
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
                                {manager.adminStaff?.user.firstName + " " + manager.adminStaff?.user.lastName}
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
          <div className="bg-[#091747] rounded-xl w-[215px] ml-1">
            <h3 className="font-medium text-[12px] bg-navy-900 text-white px-[10px] py-[5px]">
              NGO Details
            </h3>
          </div>
          <div className="px-2 text-[#091747]">
            <div className="text-[12px]">
              <span className="font-bold">NGO:</span>{" "}
              <span className="font-medium">{data?.businessName}</span>
            </div>
            <div className="text-[12px]">
              <span className="font-bold">Mobile:</span>{" "}
              <span className="font-medium">{data?.businessMobile}</span>
            </div>
            <div className="text-[12px]">
              <span className="font-bold">Email:</span>{" "}
              <span className="font-medium">{data?.businessEmail}</span>
            </div>
            <div className="text-[12px]">
              <span className="font-bold">Manager:</span>{" "}
              <span className="font-medium">{data?.managers[0]?.firstName}</span>
            </div>
            <div className="text-[10px] bg-[#A301D5] max-w-fit  text-white px-2 rounded-full mt-1">
              <span className="font-medium">
                {data?.businessType.replace("_", " ")}
              </span>
            </div>
            <div className="text-[10px] bg-[#A0A0A0] max-w-fit  text-white px-2 rounded-full mt-1">
              <span className="font-semibold">NGO Status:</span>{" "}
              <span>{data?.businessStatus}</span>
            </div>
          </div>
          <div className="rounded-lg">
            <div className="bg-[#091747] rounded-xl w-[215px] ml-1">
              <h3 className="font-medium text-[12px] bg-navy-900 text-white px-[10px] py-[5px]">
                User Details
              </h3>
            </div>
            <div className="px-2 pt-1 text-[#091747]">
              <div className="text-[12px]">
                <span className="font-bold">Client:</span>{" "}
                <span className="font-medium">
                  {data?.businessUsers[0]?.firstName +
                    " " +
                    data?.businessUsers[0]?.lastName}
                </span>
              </div>
              <div className="text-[12px]">
                <span className="font-bold">Mobile:</span>{" "}
                <span className="font-medium">
                  {data?.businessUsers[0]?.mobileNumber}
                </span>
              </div>
              <div className="text-[12px]">
                <span className="font-bold">Email:</span>{" "}
                <span className="font-medium">
                  {data?.businessUsers[0]?.email}
                </span>
              </div>
              <div className="text-[12px]">
                <span className="font-semibold">Manager:</span>{" "}
                <span className="font-medium">DEV</span>
              </div>
              <div className="text-[10px] bg-[#FAB515] max-w-fit text-white px-2 rounded-full mt-1">
                <span className="font-semibold">KYC Status:</span>{" "}
                <span>Pending</span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-[#091747] rounded-xl w-[215px] ml-1">
              <h3 className="font-normal text-[12px] bg-navy-900 text-white px-[10px] py-[5px] rounded">
                Creator Details
              </h3>
            </div>
            <div className="px-2 pt-1 text-[#091747]">
              <div className="text-[12px]">
                <span className="font-semibold">Creator:</span>{" "}
                <span className="font-medium">
                  {data?.creator.firstName + " " + data?.creator.lastName}
                </span>
              </div>
              <div className="text-[12px] mb-2">
                <span className="font-semibold">Created On:</span>{" "}
                <span className="font-medium">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* </div> */}

      {/* </div> */}
    </div>
  );
};
