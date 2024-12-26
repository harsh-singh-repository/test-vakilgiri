"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { ServiceTable } from "./client-table";
import { ProjectPageServer } from "./ClientPageServer";
import ClientCard from "./client-card";
import Modal from "@/components/model/custom-modal";
import AddRetailer from "./CreateRetailer";

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

export default function RetailersPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


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

  return (
      <div className="flex-1 space-y-1 p-4 pt-6 md:p-4">
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-bold text-[#042559] ml-1">{`Retailers`}</div>

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

              <div className="bg-[#f21300] text-white p-2 rounded-md cursor-pointer" onClick={openModal}>
                <Plus className="h-6 w-6" />
              </div>

              <Modal isOpen={isModalOpen} onClose={closeModal} className="w-[400px]">
                <AddRetailer onClose={closeModal}/>
              </Modal>

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
  );
}
