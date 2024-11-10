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


  const totalUsers = 20; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const { businesses: paginatedUsers } = await fakeBusinesss.getBusinesses({ page, limit: pageLimit, search }) || { users: [] };
  const fallbackUsers = paginatedUsers.length > 0 ? paginatedUsers : await fakeBusinesss.getAll({ search });
  const employee: Business[] = fallbackUsers.length > 0 ? fallbackUsers : fakeBusinesss.records;

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <div className='text-2xl font-bold'>{`Businesses (${totalUsers})`}</div>

          <Button
            className='bg-[#f21300] text-white'
          >
           <Plus className="mr-2 h-4 w-4" /> Add New Busuiness
          </Button>
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
    </>
  );
}
