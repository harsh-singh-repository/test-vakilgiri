import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BussinessIdForm from "./BussinessIdForm";


const BussinessIdSettings = () => {
  return (
      <div className="bg-white w-full rounded-md">
        <div className="flex flex-col px-4 py-2 gap-y-3">
          <div className="flex flex-row gap-4">
            <div>
              <span className="text-[#F21300] font-semibold">
                Edit :
                <span className="text-[#091747] font-semibold">
                  {" "}
                  VINEETA WELFARE FOUNDATION
                </span>
              </span>
            </div>
            <div className="bg-[#00942A] max-w-fit rounded-lg text-[10px] align-middle text-white px-2 py-1">
              Active
            </div>
          </div>
          <Tabs defaultValue="account" className="w-full max-h-fit">
            <TabsList>
              <TabsTrigger value="basicDetails">Basic Details</TabsTrigger>
              <TabsTrigger value="regestration">Regestration</TabsTrigger>
              <TabsTrigger value="social">Social Handles</TabsTrigger>
            </TabsList>
            <TabsContent value="basicDetails" className="w-full max-h-fit">
                <BussinessIdForm/>
            </TabsContent>
            <TabsContent value="regestration">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

export default BussinessIdSettings;
