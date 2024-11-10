import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Client } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { columns } from '../client/_component/columns';
import { ClientTable } from '../client/_component/client-table';
import { fakeUsers } from '@/constants/client-table-data';
import ClientCard from './_component/client-card';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Client', link: '/dashboard/client' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function ClientPage({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || undefined;
  const offset = (page - 1) * pageLimit;


  const totalUsers = 20; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const { users: paginatedUsers } = await fakeUsers.getUsers({ page, limit: pageLimit, search }) || { users: [] };
  const fallbackUsers = paginatedUsers.length > 0 ? paginatedUsers : await fakeUsers.getAll({ search });
  const employee: Client[] = fallbackUsers.length > 0 ? fallbackUsers : fakeUsers.records;

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <div className='text-2xl font-bold text-[#042559]'>{`Clients (${totalUsers})`}</div>

          <Button
            className='bg-[#f21300] text-white'
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Client
          </Button>
        </div>
        <Separator />

        <ClientCard/>

        <ClientTable
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
