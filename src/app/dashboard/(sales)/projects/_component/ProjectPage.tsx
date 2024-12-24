// ClientPage.tsx
"use client";
import React, {Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { ClientTable } from "./client-table";
import ClientCard from "./client-card";
import { useSearchParams } from "next/navigation";
import { ClientPageServer } from "./ClientPageServer";
import { Client } from "@/constants/data";
import {Oval} from "react-loader-spinner"
import { FormModal } from "@/app/dashboard/tickets/_components/ticketFormModal";
import ProjectCreate from "./projectCreate";

type ResponseData = {
  employee: Client[];
  totalUsers: number;
  pageCount: number;
};

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Client", link: "/dashboard/client" },
// ];

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await ClientPageServer({ page, pageLimit, searchValue });
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
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-bold text-[#042559] ml-1">{`Projects (${responseData.totalUsers})`}</div>

          <div className="flex justify-center item-center gap-4">
            <Suspense>
            <Input
              placeholder="Search project..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
              className="w-full md:max-w-sm ml-auto bg-white"
              />
              </Suspense>
              <div className="bg-[#f21300] text-white p-2 rounded-md cursor-pointer" onClick={handleOpenModal}>
                <Plus className="h-6 w-6" />
              </div>
          </div>
          {isModalOpen && (
            <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <ProjectCreate close={handleCloseModal}/>
            </FormModal>
          )}
        </div>
        <Separator />

        <ClientCard />
        
        <Separator/>
        
        <ClientTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={responseData.totalUsers}
          data={responseData.employee}
          pageCount={responseData.pageCount}
        />
      </div>
  );
}
