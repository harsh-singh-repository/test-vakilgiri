"use client";
import { useEffect, useState } from "react";
// import { Breadcrumbs } from "@/components/breadcrumbs";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./_component/columns";
import { LeadsTable } from "./_component/leads-table";
import LeadsCard from "./_component/leads-card";
import { useSearchParams } from "next/navigation";
import { LeadsPageServer } from "./_component/LeadsPageServer";
import { Leads } from "@/constants/data";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateLeadForm from "./_component/create-lead-form";
import {Oval} from "react-loader-spinner"

type ResponseData = {
  employee: Leads[];
  totalUsers: number;
  pageCount: number;
};

// const breadcrumbItems = [
//   { title: "Dashboard", link: "/dashboard" },
//   { title: "Leads", link: "/dashboard/leads" },
// ];

export default function LeadsPage() {
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
      const data = await LeadsPageServer({ page, pageLimit, searchValue });
      setResponseData(data);
    };

    fetchData();
  }, [page, pageLimit, searchValue]);

  if (!responseData) {
    return (
       <div className="flex justify-center item-center h-[100vh]">
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
    )
  }

  return (
    <Dialog>
    <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-4  overflow-hidden">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <div className="flex items-start justify-between">
        <div className="text-2xl font-bold text-[#042559]">{`Leads (${responseData.totalUsers})`}</div>

        <div className="flex justify-center item-center gap-4">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
          />

         <DialogTrigger>
         <div className="bg-[#f21300] text-white p-2 rounded-md">
            <Plus className="h-6 w-6" />
          </div>
         </DialogTrigger>
         <CreateLeadForm/>
        </div>
      </div>
      <Separator />

      <LeadsCard />

        <LeadsTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={responseData.totalUsers}
          data={responseData.employee}
          pageCount={responseData.pageCount}
        />
    </div>
    </Dialog>
  );
}
