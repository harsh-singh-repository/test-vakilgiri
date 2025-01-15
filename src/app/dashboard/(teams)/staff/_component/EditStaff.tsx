"use client";

// import { X } from "lucide-react";
import OfficialForm from "./OfficialForm";
import BankDetailsForm from "./BankDetailsFom";
import { PersonalStaffDetails } from "./PersonalStaffDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditStaff() {
  return (
    <div className="mt-3">
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
