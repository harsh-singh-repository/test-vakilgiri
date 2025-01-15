"use client";
import { useState} from "react";
import { ChevronsLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./tables/columns";
import { BusinessTable } from "./tables/business-table";
import BusinessCardSection from "./business-card";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import AddNewBussinessDialog from "./add-new-bussiness-dialog";
import { useGetBussiness, useSearchBussinessQuery } from "@/hooks/business/manage-business";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBussinessRegistrationLayout from "./AddBussinessRegestrationLayout";
import UpdateSocials from "./UpdateSocials";
import BussinessDocuments from "./BussinessDocuments";

export default function BusinessPage() {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 10;

  const { data } = useGetBussiness();
  const { data: searchedData} = useSearchBussinessQuery(searchValue);

  const [addBussiness, setAddBussiness] = useState<boolean>(true);

  // Handle loading state
  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <Oval visible={true} height="40" width="40" color="#f21300" ariaLabel="oval-loading" />
      </div>
    );
  }

  const filteredData = searchValue ? searchedData : data;

  return addBussiness ? (
    <div className="flex-1 space-y-2 p-4 pt-[10px]">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#042559]">{`Businesses (${filteredData?.length})`}</div>

        <div className="flex justify-center item-center gap-4">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search name..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
              className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
            />
            <div
              className="bg-[#f21300] text-white max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-sm cursor-pointer p-1"
              onClick={() => setAddBussiness(false)}
            >
              <Plus strokeWidth={"5"} size={"18"} />
            </div>
          </div>
        </div>
      </div>

      <BusinessCardSection />

      <BusinessTable
        searchKey="businessSearch"
        searchValue={searchValue}
        pageNo={page}
        columns={columns}
        totalUsers={filteredData?.length || 0}
        data={filteredData || []}
        pageCount={Math.ceil(filteredData?.length / pageLimit)}
      />
    </div>
  ): (
    <div className="bg-white p-3">
      <div className="flex gap-x-3 items-center">
        <div
          className="bg-[#042559] text-white max-w-fit p-2 cursor-pointer rounded-md"
          onClick={() => setAddBussiness(true)}
        >
          <ChevronsLeft className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <div className="text-[#091747] text-[22px] font-semibold">Link Your Business</div>
          <div className="text-[#F21300] text-[12px] leading-none font-medium">
            Please fill all the information correctly to get the most out of Vakilgiri.
          </div>
        </div>
      </div>
      <Tabs defaultValue="Add Business" className="w-full mt-3">
        <TabsList className="text-[#042559]">
          <TabsTrigger value="Add Business">Add Business</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="Add Business">
          <AddNewBussinessDialog />
        </TabsContent>
        <TabsContent value="registration">
          <AddBussinessRegistrationLayout/>
        </TabsContent>
        <TabsContent value="social" className="p-6">
          <div className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
            Social media
          </div>
          <UpdateSocials/>
        </TabsContent>
        <TabsContent value="documents" className="p-6">
          <BussinessDocuments/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
