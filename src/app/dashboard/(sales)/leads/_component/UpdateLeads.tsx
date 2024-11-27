// "use client"

// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPencilAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { Plus, X } from "lucide-react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import EditClientPopover from "./EditClientPopover";

export default function UpdateLeads() {
  // const [openAccordion, setOpenAccordion] = useState<string | undefined>(
  //   "discussions"
  // );

  return (
    <DialogContent className="max-w-[825px] px-5 py-1">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <DialogTitle className="text-2xl font-bold mb-4 text-[#1e3a8a] text-[17px]">
            80G (Final) Registration
          </DialogTitle>
          <Accordion
            type="single"
            collapsible
            className="bg-white rounded-md shadow"
          >
            <AccordionItem value="discussions">
              <AccordionTrigger className="bg-gray-200 text-lg font-semibold px-4 py-2 text-[#1e3a8a] text-[15px]">
                Discussions
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <Textarea
                  placeholder="Enter Description"
                  className="mb-2 border border-gray-300"
                />
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Save
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reminders">
              <AccordionTrigger className="bg-gray-200 text-lg font-semibold px-4 py-2 text-[#1e3a8a] text-[15px]">
                Reminders
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Call"
                    className="flex-1 border border-gray-300"
                  />
                  <Input
                    placeholder="21-11-2024"
                    className="flex-1 border border-gray-300"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="mb-2 border border-gray-300"
                />
                <Textarea
                  placeholder="Enter description"
                  className="mb-2 border border-gray-300"
                />
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Save
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-full md:w-1/3 bg-white shadow px-2">
          {/* <CardHeader className="bg-gray-200 py-2"> */}
          <div className="font-semibold text-[#1e3a8a] text-[13px]">
            Assigned Users
          </div>
          {/* </CardHeader> */}
          <div className="px-2 py-3">
            <div className="flex items-center mb-4 mt-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <Button
                variant="outline"
                size="sm"
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-0"
              >
                +
              </Button>
            </div>
            <div className="mb-4 text-[12px]">
              <div className="flex flex-row gap-x-2">
                <div className="px-2 py-1 bg-[#091747] rounded-lg w-full">
                  <h2 className="font-bold text-white">Lead Details</h2>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <div className="bg-red-500 text-white flex justify-center items-center p-2 rounded-md">
                      <FaPencilAlt />
                      <EditClientPopover />
                    </div>
                  </PopoverTrigger>
                </Popover>
              </div>
              <p>
                <span className="font-bold">Name:</span> Parag vadgama
              </p>
              <p>
                <span className="font-bold">Mobile:</span> 0966239134
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                paragvadgama1@gmail.com
              </p>
              <p>
                <span className="font-bold">Service:</span> 80G (Final)
                Registration
              </p>
              <p>
                <span className="font-bold">Value:</span> 111
              </p>
              <p>
                <span className="font-bold">Existing:</span> No
              </p>
              <Badge className="bg-yellow-500 hover:bg-yellow-500 text-black mt-2">
                Status: Not Picked
              </Badge>
              <Button className="w-full bg-gray-500 hover:bg-red-500 text-white mt-2">
                Create Client
              </Button>
            </div>
            <div className="mb-4 text-[12px]">
              <h2 className="font-bold text-[#1e3a8a] flex items-center">
                Client Details
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-0"
                >
                  +
                </Button>
              </h2>
              <p>Name:</p>
              <p>PAN:</p>
              <p>Mobile:</p>
              <p>Email:</p>
              <p>Manager:</p>
              <Badge className="bg-red-500 hover:bg-red-500 text-white mt-2">
                KYC Status: Incomplete
              </Badge>
            </div>
            <div className="text-[12px]">
              <h2 className="font-bold text-[#1e3a8a] flex items-center">
                Business Details
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-0"
                >
                  +
                </Button>
              </h2>
              <p>Business:</p>
              <p>Manager:</p>
              <Badge className="bg-red-500 hover:bg-red-500 text-white mt-2">
                Business Status:
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
