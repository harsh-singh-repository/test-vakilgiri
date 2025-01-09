"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { LuRefreshCcw } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import ClientCard from "./client-card";
import { EstimateTable } from "./estimate-table";
import { useGetEstimate } from "@/hooks/estimates/manage-estimates";
import { FaFilter, FaUpload } from "react-icons/fa";


export default function EstimatePage() {

  const {data} = useGetEstimate();

  console.log("Estimate",data)

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );


  if (!data) {
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

  return (

      <div className="flex-1 space-y-2 p-4 pt-6 md:p-4">
        <div className="flex items-start justify-between">
          <div className="text-xl font-semibold text-[#042559]">{`Estimates (${data?.length})`}</div>

          <div className="flex justify-center items-center gap-4">
          <div className="flex gap-2 items-center">
              <Input
                placeholder="Type here..."
                value={searchValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(event.target.value)
                }
                className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
              />


              <div className="bg-[#031747] text-white max-h-fit max-w-fit rounded-sm cursor-pointer p-1.5 hover:bg-[#f21300]">
                <FaUpload strokeWidth={"5"} size={"16"}/>
              </div>
              <div className="bg-[#031747] text-white max-h-fit max-w-fit rounded-sm cursor-pointer p-1.5 hover:bg-[#f21300]">
                <FaFilter strokeWidth={"5"} size={"16"}/>
              </div>
              <div className="bg-[#031747] text-white max-h-fit max-w-fit rounded-sm cursor-pointer p-1.5 hover:bg-[#f21300]">
                <LuRefreshCcw  strokeWidth={"3"} size={"16"}/>
              </div>
              </div>

          </div>
        </div>


        <ClientCard />

        <Separator />

        <EstimateTable
        searchKey="businessSearch"
        searchValue={searchValue} // Pass the searchValue here
        pageNo={page} // Pass the 'page' value here
        columns={columns}
        totalUsers={data?.length} // Pass the total number of businesses here
        data={data} // Pass the actual business data here
        pageCount={Math.ceil(data.length / pageLimit)} // Pass the page count here
      />
      </div>
  );
}
