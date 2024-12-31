"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Results from "../../_component/DashboardCards";
import ClientDashboard from "../_component/ClientDashboard";

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
import {PlusCircle } from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import Personal_Form from "../_component/Personal_Form";
import Component from "../_component/Address_Form";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useGetClientsById } from "@/hooks/clients/manage-client";
import { useRouter } from "next/navigation";
import { ClinetBussinessDetails } from "../_types";
import { Oval } from "react-loader-spinner";
import { FaRegEye } from "react-icons/fa";

function Page() {
  const params = useParams();
  const { clientId } = params;

  const router = useRouter();

  const { data: bussinessData } = useGetClientsById(clientId);

  console.log("Bussiness of Client", bussinessData);

  const handleRouteClick = (id: string) => {
    router.push(`/dashboard/business/${id}`);
  };

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

  if (!bussinessData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#f21300"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <Tabs defaultValue="Dashboard">
      <div className="relative rounded-sm h-full bg-muted flex flex-col top-0 mt-1">
        <TabsList className="absolute flex flex-row justify-stretch w-full overflow-x-auto px-5">
          {tabs.map((value, index) => (
            <TabsTrigger
              className="w-full text-[#091747]"
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
          <div className="flex justify-between sm:flex-col md:flex-row">
            <span className="text-[18px] font-semibold">Businesses</span>
            <div className="flex gap-x-2 flex-col gap-y-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row">
              <div className="h-fit w-fit text-[13px] font-medium bg-[#091747] text-white px-2 py-1 rounded-md">Register New Business</div>
              <div className="h-fit w-fit text-[13px] font-medium bg-[#f21300] text-white px-2 py-1 rounded-md">Link Existing Business</div>
            </div>
          </div>
          <div className="flex gap-x-2 gap-y-2 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row mt-2">
            {bussinessData?.businessesAsMember.map(
              (bussiness: ClinetBussinessDetails, index: number) => {
                return (
                  <Card className="w-full h-[107px]" key={index}>
                    <div className="flex flex-col">
                      <div className="flex gap-x-4 p-3  items-center">
                        <div className="h-10 w-10 bg-white rounded-md drop-shadow-lg"/>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-[#091747]">
                            {bussiness.businessName}
                          </span>
                          <span className="text-[13px] font-medium text-[#f21300]">
                            {bussiness.businessType.replace("_"," ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex item-center justify-between px-4 mb-3">
                        <div className="bg-[#a8a8a8] h-fit w-fit text-[10px] text-white rounded-full px-2 font-medium">
                          <span>Active</span>
                        </div>
                        <FaRegEye
                          className="bg-[#091747] cursor-pointer text-white h-6 w-6 rounded-md p-2"
                          onClick={() => handleRouteClick(bussiness.id)}
                        />
                      </div>
                    </div>
                  </Card>
                );
              }
            )}
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
                  <Personal_Form clientId={clientId} />
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
