"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./table/columns";
import { LeadsTable } from "./table/leads-table";
import LeadsCard from "./leads-card";
import { useSearchParams } from "next/navigation";
// import { LeadsPageServer } from "./LeadsPageServer";s
// import { Leads } from "@/constants/data";s
import { Dialog} from "@/components/ui/dialog";
import CreateLeadForm from "./create-lead-form";
import { Oval } from "react-loader-spinner";
import { useGetLeads } from "@/hooks/leads/manage-leads";
import Modal from "@/components/model/custom-modal";

// type ResponseData = {
//   employee: Leads[];
//   totalUsers: number;
//   pageCount: number;
// };

export default function LeadsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
   
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {data} = useGetLeads();

  console.log("Leads all",data)

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
    <Dialog>
      <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-4 overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="text-2xl font-bold text-[#042559]">{`Leads (${data.length})`}</div>

          <div className="flex justify-center items-center gap-4">
            <div className='flex gap-2 items-center'>
          <Input
            placeholder="Search name..."
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
            />

              <div className="bg-[#f21300] text-white max-h-fit max-w-fit rounded-lg cursor-pointer p-1" onClick={openModal}>
                <Plus strokeWidth={"5"}/>
              </div>
          </div>
              <Modal isOpen={isModalOpen} onClose={closeModal} className="border-[#f21300] border-2"> 
                 <CreateLeadForm onClose={closeModal}/>                 
              </Modal>
          </div>
        </div>
        <Separator />

        <LeadsCard />

        <LeadsTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data.length}
          data={data} // Pass mapped data here
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      </div>
    </Dialog>
  );
}
