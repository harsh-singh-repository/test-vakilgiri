// BusinessPage.tsx
'use client'
import { useEffect, useState } from 'react';
// import { Breadcrumbs } from '@/components/breadcrumbs';
// import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { columns } from './_component/columns';
import { BusinessTable } from './_component/business-table';
import BusinessCardSection from './_component/business-card';
import { useSearchParams } from 'next/navigation';
import { Business } from '@/constants/data';
import { fakeBusinesss } from '@/constants/business-table-data';
// import Spinner from '@/components/smooth-spinner';
import {Oval} from "react-loader-spinner"
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddNewBussinessDialog from './_component/add-new-bussiness-dialog';

type ResponseData = {
  businesses: Business[];
  totalBusinesses: number;
  pageCount: number;
};

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
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // const offset = (page - 1) * pageLimit;
      const totalBusinesses = 10; // You can replace this with actual business count
      const pageCount = Math.ceil(totalBusinesses / pageLimit);

      const { businesses: paginatedBusinesses } =
        (await fakeBusinesss.getBusinesses({
          page,
          limit: pageLimit,
          search: searchValue,
        })) || { businesses: [] };
      const fallbackBusinesses =
        paginatedBusinesses.length > 0
          ? paginatedBusinesses
          : await fakeBusinesss.getAll({ search: searchValue });
      const businesses: Business[] =
        fallbackBusinesses.length > 0
          ? fallbackBusinesses
          : fakeBusinesss.records;

      setResponseData({
        businesses,
        totalBusinesses,
        pageCount,
      });
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
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-4">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <div className="flex items-start justify-between">
        <div className="text-2xl font-bold text-[#042559]">{`Businesses (${responseData.totalBusinesses})`}</div>

        <div className="flex justify-center item-center gap-4">
          <Input
            placeholder="Search name..."
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
          />

      <Dialog>
            <DialogTrigger>
              <div className="bg-[#f21300] text-white p-2 rounded-lg">
                <Plus className="h-6 w-6" />
              </div>
            </DialogTrigger>
              <AddNewBussinessDialog/>
      </Dialog>
        </div>
      </div>
      <Separator />

      <BusinessCardSection />

      <BusinessTable
        searchKey="businessSearch"
        searchValue={searchValue} // Pass the searchValue here
        pageNo={page} // Pass the 'page' value here
        columns={columns}
        totalUsers={responseData.totalBusinesses} // Pass the total number of businesses here
        data={responseData.businesses} // Pass the actual business data here
        pageCount={responseData.pageCount} // Pass the page count here
        />
    </div>
  );
}
