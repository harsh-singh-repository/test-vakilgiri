import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Business } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { columns } from './_component/columns';
import { BusinessTable } from './_component/business-table';
import { fakeBusinesss } from '@/constants/business-table-data';
import BusinessCardSection from './_component/business-card';
import { Dialog } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import AddNewBusinessForm from './_component/add-new-business-form';
import AddNewBussinessDialog from './_component/add-new-bussiness-dialog';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Business', link: '/dashboard/business' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function BusinessPage({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || undefined;
  const offset = (page - 1) * pageLimit;


  const totalUsers = 10; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const { businesses: paginatedUsers } = await fakeBusinesss.getBusinesses({ page, limit: pageLimit, search }) || { users: [] };
  const fallbackUsers = paginatedUsers.length > 0 ? paginatedUsers : await fakeBusinesss.getAll({ search });
  const employee: Business[] = fallbackUsers.length > 0 ? fallbackUsers : fakeBusinesss.records;

  return (
    <>
    <Dialog>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <div className='text-2xl font-bold text-[#042559]'>{`Businesses (${totalUsers})`}</div>

          <DialogTrigger>
             <div className='bg-[#f21300] text-white flex px-3 py-1 rounded-md'>
               <Plus/>
             </div>
          </DialogTrigger>
           <AddNewBussinessDialog/>
        </div>
        <Separator />

        <BusinessCardSection />

        <BusinessTable
          searchKey="search"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={employee}
          pageCount={pageCount}
        />
      </div>
      </Dialog>
    </>
  );
}
