"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { ServiceTable } from "./client-table";
import { ProjectPageServer } from "./ClientPageServer";
import ClientCard from "./client-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessTips from "./BussinessTips";
import AddNewBussinessDialog from "@/app/dashboard/business/_component/add-new-bussiness-dialog";
import DirectorForm from "./Directors";
import ListingRegestration from "./ListingRegistration";
import UpdateSocials from "@/app/dashboard/business/_component/UpdateSocials";
import ListingForm from "./ListingFom";
import BussinessDocuments from "@/app/dashboard/business/_component/BussinessDocuments";
import ConfirmationPage from "./ConfirmationPage";

type Project = {
  date: string;
  paymentId: string;
  invoiceId: string;
  business: string;
  project: string;
  amount: string;
  status: string;
};

type ResponseData = {
  projects: Project[];
  totalProjects: number;
  pageCount: number;
};

export default function ListingPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [AddListing, setAddListing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ProjectPageServer({ page, pageLimit, searchValue });
      setResponseData(data);
    };

    fetchData();
  }, [page, pageLimit, searchValue]);

  if (!responseData) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
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

  return !AddListing ? (
    <div className="flex-1 space-y-1 p-4 pt-6 md:p-4">
      <div className="flex items-start justify-between">
        <div className="text-[20px] font-bold text-[#042559] ml-1">{`Listing`}</div>

        <div className="flex justify-center items-center gap-4">
          <Suspense>
            <Input
              placeholder="Search project..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
              className="w-full md:max-w-sm ml-auto bg-white"
            />
          </Suspense>

          <div
            className="bg-[#f21300] text-white p-1 rounded-md cursor-pointer"
            onClick={() => setAddListing(true)}
          >
            <Plus strokeWidth={5} className="h-6 w-6" />
          </div>
        </div>
      </div>
      <Separator />

      <ClientCard />

      <Separator />

      <ServiceTable columns={columns} data={responseData.projects} />
    </div>
  ) : (
    <div className="p-3 w-full">
      <div className="bg-white flex w-full shadow-lg rounded-lg border-gray-500 md:flex-col flex-col lg:flex-row xl:flex-row">
        <div className="bg-white p-3 w-[90%] rounded-lg">
          <div className="flex gap-2 items-start">
            <div
              className="bg-[#042559] rounded-md p-1 max-w-fit text-white cursor-pointer"
              onClick={() => setAddListing(false)}
            >
              <ChevronsLeft />
            </div>
            <div className="">
              <div className="text-[22px] font-medium">
                List Business for Sale
              </div>
              <div className="text-[12px] text-[#f21300] font-medium">
                Please fill all the information correctly to get the most out of
                Vakilgiri.
              </div>
            </div>
          </div>
          <Tabs defaultValue="bussiness" className="mt-2">
            <TabsList className="text-[#042559] overflow-x-auto">
              <TabsTrigger value="bussiness">Bussiness</TabsTrigger>
              <TabsTrigger value="directors">Directors</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="listing">Listing</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            </TabsList>
            <TabsContent value="bussiness">
              <AddNewBussinessDialog style="p-3" />
            </TabsContent>
            <TabsContent value="directors">
              <DirectorForm />
            </TabsContent>
            <TabsContent value="registration" className="p-3">
              <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
              Registration Details
              </span>
              <ListingRegestration />
            </TabsContent>
            <TabsContent value="social" className="p-3">
              <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
                Social Media
              </span>
              <UpdateSocials/>
            </TabsContent>
            <TabsContent value="listing" className="p-3">
              <span className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
                Listing
              </span>
              <ListingForm/>
            </TabsContent>
            <TabsContent value="documents" className="p-3">
             <BussinessDocuments/>
            </TabsContent>
            <TabsContent value="confirmation" className="p-3">
             <ConfirmationPage setAddListing={setAddListing}/>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:w-[25%] xl:w-[25%] md:w-full sm:w-full">
          <BusinessTips />
        </div>
      </div>
    </div>
  );
}
