"use client"

import React from 'react'
import { IoMdMail } from "react-icons/io"
import { FaStackExchange } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

import { format } from "date-fns"
import { 
  CalendarIcon, 
  Plus,
  //  X 
  } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { useGetClients, useGetClientsById } from '@/hooks/users/manage-client'

const formSchema = z.object({
  discussion: z.string().min(1, "Discussion is required"),
  reminderType: z.string().min(1, "Reminder type is required"),
  reminderDate: z.date(),
  reminderSubject: z.string().min(1, "Subject is required"),
  reminderDescription: z.string().min(1, "Description is required"),
})

const StackExchangeDialog = (id:string) => {
  // const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discussion: "",
      reminderType: "",
      reminderSubject: "",
      reminderDescription: "",
    },
  })

  console.log("Response",id);
  


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <DialogContent className="max-w-[850px]">
    <DialogHeader>
      <DialogTitle className='text-[17px] text-[#091747] uppercase'>Parag Vadgama</DialogTitle>
    </DialogHeader>
    <div className="grid grid-rows gap-4 md:grid-rows-1 sm:grid-rows-1 lg:grid-cols-2 xl:grid-cols-[500px,250px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="discussions">
                <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-full text-[#091747] text-[15px] font-medium">
                  Discussions
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="discussion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end mt-2">
                    <Button type="submit">Save</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reminders" className="mt-4">
                <AccordionTrigger className="bg-[#d4d4d4] px-3 py-1 rounded-full text-[#091747] text-[15px] font-medium">
                  Reminders
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reminderType"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Call" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="call">Call</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="task">Task</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reminderDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="reminderSubject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reminderDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Save</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
        <div className="space-y-2 bg-[#ededed] rounded-md">
          <div className="rounded-lg px-2 py-2">
            <h3 className="font-semibold mb-3 text-[13px] text-[#091747]">Assigned Users</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>PV</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="default" className="h-8 w-8 bg-transparent text-[#f21300] hover:bg-transparent">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="rounded-lg px-2 py-2">
            <div className='bg-[#091747] rounded-md'>
              <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                 Client Details
               </h3>
            </div>
            <div className="">
              <div className='text-[12px]'>
                <span className="font-semibold">Client:</span> Parag Vadgama
              </div>
              <div className='text-[12px]'>
                <span className="font-semibold">Mobile:</span> 9662391342
              </div>
              <div className='text-[12px]'>
                <span className="font-semibold">Email:</span>{" "}
                paragvadgama12@gmail.com
              </div>
              <div className='text-[12px]'>
                <span className="font-semibold">Manager:</span> DEV
              </div>
              <div className='text-[10px] bg-[#f21300] max-w-fit text-white px-2 py-1 rounded-md'>
                <span className="font-semibold">KYC Status:</span>{" "}
                <span>Pending</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border px-2 py-2">
          <div className='bg-[#091747] rounded-md'>
              <h3 className="font-normal text-[12px] mb-3 bg-navy-900 text-white px-[10px] py-[5px] rounded">
                Bussiness List
               </h3>
            </div>
            <div>
              <div className="font-semibold text-[12px]">1. KARAN (OPC) PRIVATE LIMITED</div>
              <div className="ml-3 mt-1 text-[12px]">
                <div>
                  <span className="font-semibold">PAN:</span> AADCK2963L
                </div>
                <div>
                  <span className="font-semibold">Manager:</span> KARAN
                </div>
                <div className='text-[10px] bg-[#008827] max-w-fit text-white px-2 py-1 rounded-md'>
                <span className="font-semibold">Status:</span>{" "}
                <span>Active</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </DialogContent>
  )
}

const ActionButton = (id: string) => {
  const router = useRouter()

  const handleEditClick = () => {
    console.log("id one",id)
    router.push(`/dashboard/client/${id}`)
  }

  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={() => {}}
      >
        <IoMdMail />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm"
          >
            <FaStackExchange />
          </Button>
        </DialogTrigger>
        <StackExchangeDialog id={id} />
      </Dialog>
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={handleEditClick}
      >
        <MdEdit />
      </Button>
    </div>
  )
}

export default ActionButton;
