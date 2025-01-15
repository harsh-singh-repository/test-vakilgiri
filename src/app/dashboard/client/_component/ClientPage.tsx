// ClientPage.tsx
"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./tables/columns";
import { ClientTable } from "./tables/client-table";
import ClientCard from "./client-card";
import { useSearchParams } from "next/navigation";
import AddClientDialog from "./AddClientDialog";
import { Oval } from "react-loader-spinner";
import {
  useGetClients,
  useSearchClinetQuery,
} from "@/hooks/clients/manage-client";
import Modal from "@/components/model/custom-modal";

export default function ClientPageContent() {
  const [searchValue, setSearchValue] = useState("");

  const { data } = useGetClients();
  const { data: SearchedData } = useSearchClinetQuery(searchValue);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log("ClinetData", data);
  console.log("SeachedData", SearchedData);
  // const [open, setOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 20;

  const paginatedData = data?.slice((page - 1) * pageLimit, page * pageLimit);

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
    <div className="flex-1 space-y-2 p-4 pt-[10px]">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#042559]">{`Clients (${data?.length})`}</div>

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

            <div
              className="bg-[#f21300] text-white max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-sm cursor-pointer p-1"
              onClick={openModal}
            >
              <Plus strokeWidth={"5"} size={"18"} />
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            className="rounded-2xl"
          >
            <AddClientDialog onClose={closeModal} />
          </Modal>
        </div>
      </div>

      <ClientCard />

      {data && (
        <ClientTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data?.length}
          data={paginatedData}
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      )}
    </div>
  );
}
