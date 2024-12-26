"use client";

// import { X } from "lucide-react";
import OfficialForm from "./OfficialForm";
import BankDetailsForm from "./BankDetailsFom";
import { PersonalStaffDetails } from "./PersonalStaffDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditStaff() {
  return (
    <div className="">
      {/* <div className="flex flex-row justify-between items-center">
          <div className="text-xl font-semibold text-[#091747]">
            Edit:
          </div>
        <div className="text-[#f21300] cursor-pointer p-1 rounded-md">
          <X className="w-6 h-6" strokeWidth={"6"} />
        </div>
      </div> */}
      <Tabs defaultValue="personal" className="w-full overflow-x-auto">
        <TabsList className="text-[#042559]">
          <TabsTrigger value="personal">1. Personal Details</TabsTrigger>
          <TabsTrigger value="official">2. Official Details</TabsTrigger>
          <TabsTrigger value="bank">3. Bank Details</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
            <PersonalStaffDetails/>
        </TabsContent>
        <TabsContent value="official">
            <OfficialForm/>
        </TabsContent>
        <TabsContent value="bank">
            <BankDetailsForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
