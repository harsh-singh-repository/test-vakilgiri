"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { PaymentTable } from "./payment-table";
import ClientCard from "./client-card";
import { useGetPayments } from "@/hooks/payments/manage-payments";


export default function PaymentPage() {
  
  const {data} = useGetPayments();

  console.log("Data",data)

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
      <div className="flex-1 space-y-3 p-4 pt-6 md:p-4">
        <div className="flex items-start justify-between">
          <div className="text-xl font-semibold text-[#042559]">{`Payments (${data?.length})`}</div>

          <div className="flex justify-center items-center gap-4">
          <div className='flex gap-2 items-center'>
          <Input
            placeholder="Type here..."
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
            />

              <div className="bg-[#f21300] text-white max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-sm cursor-pointer p-1">
                <Plus strokeWidth={"5"} size={"18"}/>
              </div>
          </div>
          </div>
        </div>

        <ClientCard />


        <PaymentTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data.length}
          data={data}
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      </div>
  );
}
