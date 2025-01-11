// ClientPage.tsx
"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientCard from "./client-card";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { useGetClients } from "@/hooks/clients/manage-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistationTable } from "./table/registration-table";
import { columns } from "./table/columns";

export default function RegistrationPageContent() {

   const {data} = useGetClients();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

    if(!data){
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
    <div className="flex-1 space-y-2 p-4 pt-[10px]">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#042559]">{`Registration ()`}</div>

        <div className="flex justify-center item-center gap-4">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Type here..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
              className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
            />

            <div className="bg-[#f21300] text-white max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-sm cursor-pointer p-1">
              <Plus strokeWidth={"5"} size={"18"} />
            </div>
          </div>
        </div>
      </div>

      <ClientCard />

      <Tabs defaultValue="gst" className="w-full">
        <TabsList className="text-[#091347]">
          <TabsTrigger value="gst"> GST</TabsTrigger>
          <TabsTrigger value="iso">ISO</TabsTrigger>
          <TabsTrigger value="12a80g">12A 80G</TabsTrigger>
          <TabsTrigger value="fssai">FSSAI</TabsTrigger>
          <TabsTrigger value="dsc">DSC</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="trademark">TradeMark</TabsTrigger>
        </TabsList>
        <TabsContent value="gst">
        {data && (
        <RegistationTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data.length}
          data={data}
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      )}
        </TabsContent>
        <TabsContent value="iso">
        {data && (
        <RegistationTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data.length}
          data={data}
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
