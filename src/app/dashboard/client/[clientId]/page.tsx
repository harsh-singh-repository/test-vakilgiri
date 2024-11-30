"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Results from "../../_component/Results";
import ClientDashboard from "../_component/ClientDashboard";
import { Button } from "@/components/ui/button";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Eye, PlusCircle } from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import Personal_Form from "../_component/Personal_Form";
import Component from "../_component/Address_Form";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useGetBussinessOfClient } from "@/hooks/users/manage-client";
import { useRouter } from "next/navigation";
import { BusinessDetails } from "../_types";

function Page() {
  const params = useParams();
  const { clientId } = params;

  const router = useRouter();

  const {data} = useGetBussinessOfClient(clientId);

  console.log("Bussiness of Client",data);

  const handleRouteClick = (id:string) => {
        router.push(`/dashboard/business/${id}`)
  }

  const tabs = [
    { name: "Dashboard" },
    { name: "All Bussiness" },
    { name: "All Projects" },
    { name: "All Payments" },
    { name: "All Tickets" },
    { name: "All Profile" },
  ];

  // const bussinessPerson = [
  //   { name: "MOHIT WELFARE FOUNDATION", company: "Section 8" },
  //   { name: "SUMOHIT ONLINE PRIVATE LIMITED", company: "Private Limited" },
  // ];
  return (
    <Tabs defaultValue="Dashboard">
      <div className="relative rounded-sm h-full bg-muted flex flex-col top-0 mt-3">
        <TabsList className="absolute flex flex-row justify-stretch w-full overflow-x-auto px-5">
          {tabs.map((value, index) => (
            <TabsTrigger
              className="w-full"
              key={`tab_trigger_${index}`}
              value={value.name}
            >
              {value.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Dashboard" className="mt-7 h-[100vh]">
          <Results />
          <ClientDashboard />
        </TabsContent>
        <TabsContent value="All Bussiness" className="mt-9 px-4 py-4 h-[100vh]">
          <div className="flex justify-between">
            <span className="">Businesses</span>
            <div className="flex gap-x-2 flex-col gap-y-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row">
              <Button className="py-2 text-xs">Register New Business</Button>
              <Button className="py-2 text-xs">Link Existing Business</Button>
            </div>
          </div>
          <div className="flex gap-x-2 gap-y-2 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
            {data?.map((bussiness:BusinessDetails,index:number) => {
              return (
                <Card className="w-[350px]" key={index}>
                  <div className="flex flex-col">
                    <div className="flex gap-x-4 p-3  items-center">
                      <div className="h-10 w-10 bg-slate-400 rounded-md drop-shadow-lg"></div>
                      <div className="flex flex-col">
                        <span className="text-sm uppercase font-medium">
                          {bussiness.businessName}
                        </span>
                        <span className="text-xs">{bussiness.businessType}</span>
                      </div>
                    </div>
                    <div className="flex item-center justify-between p-4">
                      <div className="bg-slate-600 px-2 text-[10px] text-white rounded-md flex items-center">
                        <span>Active</span>
                      </div>
                      <Eye size={"20"} className="text-[#091747] cursor-pointer" onClick={() => handleRouteClick(bussiness.id)}/>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="All Profile" className="mt-12 h-[100vh] px-5">
          <div className="flex flex-col items-center gap-3 md:flex-col lg:flex-row lg:items-start">
            <Card className="p-5 w-full">
              <div className="flex flex-row items-center gap-3">
                <RxAvatar size={"50"} />
                <div className="flex-col item-center">
                  <span className="uppercase font-semibold">Nahar Singh</span>
                  <div className="text-xs">
                    <span className="text-xs font-semibold">[E]:</span>
                    naharsingh151299@gmail.com
                  </div>
                  <div className="text-xs">
                    <span className="text-xs font-semibold">[P]:</span>
                    7084380147
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-5 w-full">
              <Tabs defaultValue="personal" className="">
                <TabsList>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <Personal_Form clientId={clientId as string} />
                </TabsContent>
                <TabsContent value="address">
                  <Component />
                </TabsContent>
                <TabsContent value="documents">
                  <div className="flex flex-col items-end">
                    <PlusCircle className="text-[#F20101]" />
                    <Separator className="w-full my-4" />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default Page;
