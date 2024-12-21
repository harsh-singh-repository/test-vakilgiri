// ClientPage.tsx
"use client";
import React, {Suspense, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./table/columns";
import { StaffTable } from "./table/client-table";
import ClientCard from "./table/client-card";
import { useSearchParams } from "next/navigation";
// import { ClientPageServer } from "./table/ClientPageServer";
import { UserTypes } from "../_types/types";
import {Oval} from "react-loader-spinner"
import Modal from "@/components/model/custom-modal";
import CreateStaff from "./CreateStaff";
import { useGetUsers } from "@/hooks/user/manage-user";

// type ResponseData = {
//   employee: Client[];
//   totalUsers: number;
//   pageCount: number;
// };

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Client", link: "/dashboard/client" },
// ];

export default function StaffPage() {
  
  const {data} = useGetUsers();


  const staffUsers: UserTypes[] = (data || []).filter((user: UserTypes) => user.userRoles === "Staff_Manager");

  console.log("Staffs",staffUsers);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  // const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await ClientPageServer({ page, pageLimit, searchValue });
  //     setResponseData(data);
  //   };

  //   fetchData();
  // }, [page, pageLimit, searchValue]);

  if (!data) {
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
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-4">
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-bold text-[#042559]">{`Staff (${staffUsers.length})`}</div>

          <div className="flex justify-center item-center gap-4">
            <Suspense>
            <Input
              placeholder="Search name..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
              className="w-full md:max-w-sm ml-auto bg-white"
              />
              </Suspense>

              <div className="bg-[#f21300] text-white max-h-fit max-w-fit rounded-lg cursor-pointer p-1" onClick={openModal}>
                <Plus strokeWidth={"5"}/>
              </div>
              <Modal isOpen={isModalOpen} onClose={closeModal} className="p-4"> 
                 <CreateStaff onClose={closeModal}/>                 
              </Modal>

          </div>
        </div> 
        <Separator />

        <ClientCard />

        <StaffTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={staffUsers.length}
          data={staffUsers}
          pageCount={Math.ceil(staffUsers.length / pageLimit)}
        />
      </div>
  );
}
