import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Personal_Form = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-3 gap-5 flex-col md:flex-col lg:flex-row xl:flex-row">
        <div className="flex flex-col gap-y-7">
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">Pan Card</div>
            <Input placeholder="Enter Name" />
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">Last Name</div>
            <Input placeholder="Enter Name" />
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">Email Id</div>
            <Input placeholder="Enter Name" />
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">Mobile No</div>
            <Input placeholder="Enter Name" />
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">Adhar No</div>
            <Input placeholder="Enter Name" />
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">DSC Status</div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Not Applicable</SelectItem>
                <SelectItem value="dark">with Vakilgiri</SelectItem>
                <SelectItem value="system">with Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-x-5 items-center">
            <div className="w-[7rem] text-xs font-medium">KYC Status</div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Pending</SelectItem>
                <SelectItem value="dark">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-7">
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">Pan Card</div>
              <Input placeholder="Enter Name" />
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">Last Name</div>
              <Input placeholder="Enter Name" />
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">Email Id</div>
              <Input placeholder="Enter Name" />
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">Mobile No</div>
              <Input placeholder="Enter Name" />
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">Adhar No</div>
              <Input placeholder="Enter Name" />
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[8rem] text-xs font-medium">Login Status</div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Not Applicable</SelectItem>
                  <SelectItem value="dark">with Vakilgiri</SelectItem>
                  <SelectItem value="system">with Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-x-5 items-center">
              <div className="w-[7rem] text-xs font-medium">KYC Status</div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Pending</SelectItem>
                  <SelectItem value="dark">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal_Form;
