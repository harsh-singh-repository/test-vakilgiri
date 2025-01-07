"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";

type Client = {
  name: string;
  date: string; // ISO 8601 string or you can use Date if necessary
  workingStatus: string;
};

type Table = {
  tableId: number;
  tableName: string;
  clients: Client[];
};

type ClientDetailDialogProp = {
  tables: Table[];
};

const ClientDetailDialog: React.FC<ClientDetailDialogProp> = ({ tables }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
      <DialogContent className="sm:max-w-[600px] p-4">
        {/* <DialogHeader className=''></DialogHeader>s */}
        <DialogTitle>
          <span className="font-bold text-[17px] uppercase">
            {tables[1].clients[1].name}
          </span>
        </DialogTitle>

        <div className="flex justify-center items-start gap-x-3 flex-col sm:flex-col md:flex-col lg:flex-row">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2" className="w-full">
              <AccordionTrigger className="bg-[#D4D4D4] px-2 text-[#091747] h-2">
                Discussions
              </AccordionTrigger>
              <AccordionContent className="mt-2 p-2">
                <div className="flex flex-col items-end">   
                  <Textarea placeholder="Enter Description" />
                  <Button
                    variant={"turnsRed"}
                    className="rounded-sm text-xs mt-2 h-5 right"
                  >
                    Save
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1" className="w-full mt-2">
              <AccordionTrigger className="bg-[#D4D4D4] px-2 text-[#091747] h-2">
                Reminders
              </AccordionTrigger>
              <AccordionContent className="mt-2">
                <div className="flex flex-col px-2 gap-x-4 gap-y-2 justify-center items-center">
                  <div className="flex justify-center md:justify-between lg:justify-between gap-3 flex-col md:flex-row lg:flex-row w-full">
                    <Select>
                      <SelectTrigger className="lg:w-[130px] md:w-[140px] sm:w-full w-full">
                        <SelectValue placeholder="Call" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">Call</SelectItem>
                          <SelectItem value="banana">Follow Up</SelectItem>
                          <SelectItem value="blueberry">Whatsapp</SelectItem>
                          <SelectItem value="grapes">Email</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="space-x-6">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="payment-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {date ? date.toDateString() : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Input placeholder="Subject" />
                  <div className="flex flex-col justify-center w-full items-end ">
                    <Textarea placeholder="Enter Description" />
                    <Button
                      variant={"turnsRed"}
                      className="rounded-sm text-xs mt-2 h-5 right"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="p-0 w-full md:w-full sm:w-full lg:w-40 mt-3">
            <Card className="">
              <CardContent className="mt-1">
                <span className="text-[12px] font-semibold text-[#091747]">
                  Assigned Users
                </span>
                <span className="text-[#F20101]">
                  <PlusCircleIcon />
                </span>
                <div className=" text-white text-[10px] px-3 bg-[#091747] rounded-md py-2 mt-2">
                  <span>Client Details</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-[10px] text-gray-700">
                    Client:
                  </span>
                  <span className="text-gray-600 text-[10px]">
                    JATIN SEHGAL
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700 text-[10px]">
                    Mobile:
                  </span>
                  <span className="text-gray-600 text-[10px]">7404833040</span>
                </div>
                <div className="mb-1">
                  <span className="font-semibold text-gray-700 text-[10px]">
                    Email:
                  </span>
                  <span className="text-gray-600 text-[10px]">
                    devrajgroup.@gmail.com
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 text-[10px]">
                    Manager:
                  </span>
                  <span className="text-gray-600 text-[10px]">
                    Manager Name
                  </span>
                </div>

                <div className=" text-white text-[10px] px-3 bg-[#091747] rounded-md py-2 mt-2">
                  <span>Bussiness List</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
  );
};

export default ClientDetailDialog;
