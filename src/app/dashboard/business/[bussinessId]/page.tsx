"use client"
import React from "react";
import BusinessIdCardSection from "../_component/business-id-card";
import BussinessDetailCard from "../_component/BussinessDetailCard";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BussinessIdSettings from "../_component/BussinessIdSettings";
import { useParams } from "next/navigation";
import FinancialsPage from "../_component/FinancialsPage";
import RegistrationLayout from "../_component/RegestrationLayout";

const Page = () => {
  
  const params = useParams();
  
  const paramsId = params.bussinessId;

  return (
    <div className="grid xl:grid-cols-[6fr_2fr] lg:grid-cols-[6fr_2fr] sm:grid-col-1 xs:grid-col-1  grid-col-1 gap-x-4 p-5 items-start h-full">
    <div className="flex flex-col gap-y-3">
      <div className="bg-[#091747] px-3 py-2 rounded-md flex flex-row justify-between items-center">
        <span className="uppercase text-white font-semibold">
          VINEETA WELFARE FOUNDATION
        </span>
        <div className="px-2 py-1 rounded-md bg-[#F21300] hover:bg-white hover:text-[#F21300] cursor-pointer text-white">
          <Plus className="h-4 w-4" />
        </div>
      </div>
      <BusinessIdCardSection />
      <Tabs defaultValue="client" className="w-full">
        <TabsList className="bg-white">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="regestration">Registration</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
          <TabsTrigger value="enquire">Enquire</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="financials">
          <FinancialsPage/>
        </TabsContent>
        <TabsContent value="regestration">
           <RegistrationLayout/>
        </TabsContent>
        <TabsContent value="settings">
         <BussinessIdSettings bussinessId={paramsId}/>
        </TabsContent>
      </Tabs>
    </div>
   <div className="hidden md:hiddem lg:block xl:block">
     <BussinessDetailCard/>
   </div>
  </div>
  );
};

export default Page;
