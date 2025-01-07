import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BussinessIdForm from "./BussinessIdForm";
import { BussinessIdSettingsPageProps } from "../_types";
import UpdateSocials from "./UpdateSocials";
import { useGetBussinessById } from "@/hooks/business/manage-business";


const BussinessIdSettings = ({bussinessId}:BussinessIdSettingsPageProps) => {

  const {data} = useGetBussinessById(bussinessId);

  return (
      <div className="bg-white w-full rounded-md">
        <div className="flex flex-col px-4 py-2 gap-y-3">
          <div className="flex flex-row gap-4">
            <div>
              <span className="text-[#F21300] font-semibold">
                Edit :
                <span className="text-[#091747] font-semibold">
                  {" "}
                  {data?.businessName}
                </span>
              </span>
            </div>
            <div className="bg-[#00942A] max-w-fit rounded-lg text-[10px] align-middle text-white px-2 py-1">
              Active
            </div>
          </div>
          <Tabs defaultValue="basicDetails" className="w-full max-h-fit">
            <TabsList className="text-[#091747]">
              <TabsTrigger value="basicDetails">Basic Details</TabsTrigger>
              <TabsTrigger value="regestration">Regestration</TabsTrigger>
              <TabsTrigger value="social">Social Handles</TabsTrigger>
            </TabsList>
            <TabsContent value="basicDetails" className="w-full max-h-fit">
                <BussinessIdForm bussinessId={bussinessId}/>
            </TabsContent>
            <TabsContent value="regestration">
              Change your password here.
            </TabsContent>
            <TabsContent value="social" className="w-full justify-center">
              <UpdateSocials bussinessId={bussinessId}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

export default BussinessIdSettings;
