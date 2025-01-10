"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ServiceTable } from "./client-table";
import { ProjectPageServer } from "./ClientPageServer";
import ClientCard from "./client-card";
import { BsUpload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

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

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ProjectPageServer({ page, pageLimit, searchValue });
      setResponseData(data);
    };

    fetchData();
  }, [page, pageLimit, searchValue]);

  if (!responseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/favicon.ico"
          alt="Loading"
          className="w-12 h-12"
          style={{
            animation: "blurInOut 2s infinite ease-in-out",
          }}
        />
        <style jsx>{`
          @keyframes blurInOut {
            0%,{
            filter: blur(2px);
              opacity: 1;
            }
            100% {
              filter: blur(4px);
              opacity: 0.3;
            }
            50% {
              filter: blur(2px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Dialog>
      <div className="flex-1 space-y-1 p-4 pt-6 md:p-4">
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-bold text-[#042559] ml-1">{`Upgrades`}</div>

          <div className="flex justify-center items-center gap-4">
            <Suspense>
              <Input
                placeholder="Type here..."
                value={searchValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(event.target.value)
                }
                className="w-full md:max-w-sm ml-auto bg-white"
              />
            </Suspense>

            <DialogTrigger>
              <div className="flex gap-1">
              <div className="bg-[#091747] w-[30px] h-[30px] flex items-center justify-center rounded-lg hover:bg-[#f21300]">
        <BsUpload className="text-white stroke-[2]" size={16} />
      </div>
      <div className="bg-[#091747] w-[30px] h-30px[] flex items-center justify-center rounded-lg hover:bg-[#f21300]">
        <FiFilter className="text-white stroke-[2]" size={16} />
      </div>
      </div>
            </DialogTrigger>
          </div>
        </div>
        <Separator />

        <ClientCard />

        <Separator />

        <ServiceTable
          columns={columns}
          data={responseData.projects}
        />
      </div>
    </Dialog>
  );
}
