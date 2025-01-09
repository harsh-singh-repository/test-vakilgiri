// BusinessPage.tsx
"use client";
import { useState } from "react";

import { ChevronsLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./tables/columns";
import { BusinessTable } from "./tables/business-table";
import BusinessCardSection from "./business-card";
import { useSearchParams } from "next/navigation";
// import { Business } from '@/constants/data';
// import { fakeBusinesss } from '@/constants/business-table-data';
// import Spinner from '@/components/smooth-spinner';
import { Oval } from "react-loader-spinner";
import AddNewBussinessDialog from "./add-new-bussiness-dialog";
import { useGetBussiness } from "@/hooks/business/manage-business";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBussinessRegistrationLayout from "./AddBussinessRegestrationLayout";
import UpdateSocials from "./UpdateSocials";
import BussinessDocuments from "./BussinessDocuments";

// type ResponseData = {
//   businesses: Business[];
//   totalBusinesses: number;
//   pageCount: number;
// };

// const breadcrumbItems = [
//   { title: 'Dashboard', link: '/dashboard' },
//   { title: 'Business', link: '/dashboard/business' }
// ];

export default function BusinessPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const [addBussiness, setAddBussiness] = useState<boolean>(true);

  const { data } = useGetBussiness();
  console.log("data bussiness", data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const offset = (page - 1) * pageLimit;
  //     const totalBusinesses = data.length; // You can replace this with actual business count
  //     const pageCount = Math.ceil(totalBusinesses / pageLimit);

  //     const { businesses: paginatedBusinesses } =
  //       (await fakeBusinesss.getBusinesses({
  //         page,
  //         limit: pageLimit,
  //         search: searchValue,
  //       })) || { businesses: [] };
  //     const fallbackBusinesses =
  //       paginatedBusinesses.length > 0
  //         ? paginatedBusinesses
  //         : await fakeBusinesss.getAll({ search: searchValue });
  //     const businesses: Business[] =
  //       fallbackBusinesses.length > 0
  //         ? fallbackBusinesses
  //         : fakeBusinesss.records;

  //     setResponseData({
  //       businesses,
  //       totalBusinesses,
  //       pageCount,
  //     });
  //   };

  //   fetchData();
  // }, [page, pageLimit, searchValue,data.length]);

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

  return addBussiness ? (
    <div className="flex-1 space-y-2 p-4 pt-[10px]">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#042559]">{`Businesses (${data.length})`}</div>

        <div className="flex justify-center item-center gap-4">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search name..."
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
             className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
            />

            <div
             className="bg-[#f21300] text-white max-h-[25px] min-h-[25px] min-w-[25px] max-w-[25px] rounded-sm cursor-pointer p-1"
              onClick={() => setAddBussiness(false)}
            >
              <Plus strokeWidth={"5"} size={"18"}/>
            </div>
          </div>

          {/* <Modal isOpen={isModalOpen} onClose={closeModal} className='p-4'> */}

          {/* </Modal> */}
        </div>
      </div>

      <BusinessCardSection />

      {/* <div className="max-w-full overflow-x-auto"> */}
      <BusinessTable
        searchKey="businessSearch"
        searchValue={searchValue} // Pass the searchValue here
        pageNo={page} // Pass the 'page' value here
        columns={columns}
        totalUsers={data?.length} // Pass the total number of businesses here
        data={data} // Pass the actual business data here
        pageCount={Math.ceil(data.length / pageLimit)} // Pass the page count here
      />
      {/* </div> */}
    </div>
  ) : (
    <div className="bg-white p-3">
      <div className="flex gap-x-3 items-center">
        <div
          className="bg-[#042559] text-white max-w-fit p-2 cursor-pointer rounded-md"
          onClick={() => setAddBussiness(true)}
        >
          <ChevronsLeft className="h-4 w-4"/>
        </div>
        <div>
        <div className="flex flex-col">
        <div className="text-[#091747] text-[22px] font-semibold">
          Link Your Bussiness
        </div>
        <div className="text-[#F21300] text-[12px] leading-none font-medium">
          Please fill all the information correctly to get the most out of
          Vakilgiri.
        </div>
      </div>
        </div>
      </div>
      <Tabs defaultValue="Add Bussiness" className="w-full mt-3 ">
        <TabsList className="text-[#042559]">
          <TabsTrigger value="Add Bussiness">Add Bussiness</TabsTrigger>
          <TabsTrigger value="regestartion">Registration</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="Add Bussiness">
          <AddNewBussinessDialog/>
        </TabsContent>
        <TabsContent value="regestartion">
            <AddBussinessRegistrationLayout/>
        </TabsContent>
        <TabsContent value="social" className="p-6">
              <div className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
                Social media
              </div>
            <UpdateSocials/>
        </TabsContent>
        <TabsContent value="documents" className="p-6">
           <BussinessDocuments/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
