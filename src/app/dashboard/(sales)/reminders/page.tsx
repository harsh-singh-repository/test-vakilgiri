'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { columns } from './_component/columns';
import { LeadsTable } from './_component/leads-table';
import { useSearchParams } from 'next/navigation';
import { LeadsPageServer } from './_component/LeadsPageServer';
import { Client, Leads } from '@/constants/data';
import { Oval } from 'react-loader-spinner';

type ResponseData = {
  employee: Client[]; // Updated type to Client[]
  totalUsers: number;
  pageCount: number;
};

// Mapping function to convert Leads to Client
const mapLeadsToClient = (lead: Leads): Client => ({
  id: lead.leadId, // Mapping leadId to id
  profileImage: 'default-profile.png', // Default profile image
  cltid: 'N/A', // Default cltid
  firstName: lead.businessOrClient, // Assuming firstName is business/client name
  lastName: lead.companyName || 'Unknown', // Default lastName
  pan: 'N/A', // Default PAN
  bussinesses: lead.service, // Map service to businesses
  projects: 'No projects', // Default projects
  wallet: '0', // Default wallet
  manager: 'Unassigned', // Default manager
  kyc: lead.status, // Assuming status maps to kyc
});

export default function ReminderPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageLimit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await LeadsPageServer({ page, pageLimit, searchValue });

      // Transform Leads[] to Client[]
      const employees = data.employee.map(mapLeadsToClient);

      setResponseData({
        employee: employees,
        totalUsers: data.totalUsers,
        pageCount: data.pageCount,
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
    <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-4 overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="text-[20px] font-bold text-[#042559]">{`Reminders`}</div>

        <div className="flex justify-center item-center gap-4">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
          />

          <Button className="bg-[#f21300] text-white">
            <Plus className="h-2 w-2" />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-0 m-0 overflow-x-auto flex flex-col">
        <LeadsTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={responseData.totalUsers}
          data={responseData.employee} // Ensure data is of type Client[]
          pageCount={responseData.pageCount}
        />
      </div>
    </div>
  );
}
