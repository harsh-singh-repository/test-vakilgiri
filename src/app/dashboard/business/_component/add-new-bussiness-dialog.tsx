"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const AddNewBussinessDialog = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <>
      <DialogContent className="pl-6 pt-5 max-w-fit">
        <DialogHeader>
          <DialogTitle>Link Your Bussiness</DialogTitle>
          <DialogDescription>
            Please fill all the information correctly to get the most out of
            Vakilgiri.
          </DialogDescription>
          <span className="inline text-[10px] bg-slate-200 text-left pt-2 pb-2 pr-1 pl-1 rounded-md">
            Basic Details
          </span>

          <div className="flex flex-col gap-3">
            <div>
              <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-4">
                <div className="flex gap-3 flex-col w-full">
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Bussiness Type</Label>
                    <Select>
                      <SelectTrigger className="w-[180px] text-xs">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Bussiness Name</Label>
                    <Select>
                      <SelectTrigger className="w-[180px] text-xs">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[180px] justify-start text-left text-xs font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon size={"10"} />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Date</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Date</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Date</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                </div>
                <div className="flex gap-3 flex-col w-full">
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">PAN Card</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">CIN/Reg no.</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Official Number</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">Reg.Address-1</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">City</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <Label className="w-[7rem] text-xs">PinCode</Label>
                    <Input placeholder="Date" className="w-[180px] text-xs" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col gap-y-4 sm:flex-col md:flex-row lg:flex-row gap-x-5">
                <div>
                  <p className="text-xs font-bold text-left">Logo.</p>
                  <div className="bg-slate-600 h-20 w-20"></div>
                </div>
                <div className="w-full">
                  <p className="text-xs font-bold text-left">
                    About the Bussiness
                  </p>
                  <Textarea
                    placeholder="Write about your Bussiness."
                    className="w-full h-full resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-7">
                <div className="flex gap-x-2 items-center">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By checking this you are agreed to our Terms & Conditions,
                    Privacy Policy, etc.
                  </label>
                </div>
                <Button className="py-1 px-2 w-32 text-xs">
                  Save and Procced
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </>
  );
};

export default AddNewBussinessDialog;
