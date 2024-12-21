"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { X } from "lucide-react";
import OfficialForm from "./OfficialForm";
import BankDetailsForm from "./BankDetailsFom";
import {PersonalStaffDetails} from "./PersonalStaffDetails";


interface onCloseProp {
  onClose: () => void;
}

export default function EditStaff({ onClose }: onCloseProp) {

  return (
    <div className="w-[800px] mx-auto p-1 pb-20">
      <div className="flex flex-row justify-center items-center">
        <div>
          <span className="text-xl font-semibold mb-6 text-center text-[#091747]">
            Edit:
          </span>
        </div>
        <div
          className="bg-[#091747] text-white cursor-pointer p-1 rounded-md absolute translate-x-[24rem]"
          onClick={onClose}
        >
          <X className="w-4 h-4" strokeWidth={"4"} />
        </div>
      </div>
      <Accordion type="multiple" className="w-full mt-5">
        <AccordionItem value="discussions" className="w-full">
          <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium">
            <span>1. Personal Details</span>
          </AccordionTrigger>
          <AccordionContent className="w-full">
             <PersonalStaffDetails/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="official-details" className="w-full">
          <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium mt-4">
            <span>2. Official Details</span>
          </AccordionTrigger>
          <AccordionContent className="w-full">
            <OfficialForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bank-details" className="border-none mt-4">
          <AccordionTrigger className="w-full bg-[#091747] px-3 py-1 rounded-md text-white text-[17px] font-medium">
            <span>3. Bank Details</span>
          </AccordionTrigger>
          <AccordionContent className="w-full pt-6">
            <BankDetailsForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
