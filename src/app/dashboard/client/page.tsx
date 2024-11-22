// ClientPage.tsx
'use client'
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { columns } from './_component/columns';
import { ClientTable } from './_component/client-table';
import ClientCard from './_component/client-card';
import { useSearchParams } from 'next/navigation';
import { ClientPageServer } from './_component/ClientPageServer';
import { Client } from '@/constants/data';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddClientDialog from './_component/AddClientDialog';
// import Spinner from '@/components/smooth-spinner';
import {Oval} from "react-loader-spinner"
import { useGetClients } from '@/hooks/users/manage-client';

type ResponseData = {
  employee: Client[];
  totalUsers: number;
  pageCount: number;
};

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Client', link: '/dashboard/client' }
];

export default function ClientPage() {
  const {data,isFetching,isSuccess,error,isError} = useGetClients();
  // console.log("Data",data);
  

  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageLimit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ClientPageServer({ page, pageLimit, searchValue });
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
    );
  };
  return (
    <Dialog>
    <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-4  overflow-hidden">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <div className="flex items-start justify-between">
        <div className='text-2xl font-bold text-[#042559]'>{`Clients (${responseData.totalUsers})`}</div>

        <div className="flex justify-center item-center gap-4">
          <Input
            placeholder='Search name...'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
          />
         
         <DialogTrigger>
          <div className='bg-[#f21300] text-white p-2 rounded-md'>
            <Plus className="h-6 w-6"/>
          </div>
          </DialogTrigger>
          <AddClientDialog/>
        </div>
      </div>
      <Separator />

      <ClientCard />

      {/* <div className='p-0 m-0 overflow-x-auto flex flex-col'> */}
      
     {data && <ClientTable
        searchKey="search"
        searchValue={searchValue}
        pageNo={page}
        columns={columns}
        totalUsers={responseData.totalUsers}
        data={data}
        pageCount={responseData.pageCount}
      />}
      {/* </div> */}
      

    </div>
    </Dialog>
  );
}
