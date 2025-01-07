'use client';
import { useState} from 'react';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useGetReminder } from '@/hooks/reminder/manage-reminder';
import { ReminderTable } from './leads-table';
// import { Input } from '@/components/ui/input';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
// import { LeadsTable } from './leads-table';
import { useSearchParams } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
// // import { LeadsPageServer } from './LeadsPageServer';
// // import { Client, Leads } from '@/constants/data';
// import { Oval } from 'react-loader-spinner';

// type ResponseData = {
//   employee: Client[]; // Updated type to Client[]
//   totalUsers: number;
//   pageCount: number;
// };

// // Mapping function to convert Leads to Client
// const mapLeadsToClient = (lead: Leads): Client => ({
//   id: lead.leadId, // Mapping leadId to id
//   profileImage: 'default-profile.png', // Default profile image
//   cltid: 'N/A', // Default cltid
//   firstName: lead.businessOrClient, // Assuming firstName is business/client name
//   lastName: lead.companyName || 'Unknown', // Default lastName
//   pan: 'N/A', // Default PAN
//   bussinesses: lead.service, // Map service to businesses
//   projects: 'No projects', // Default projects
//   wallet: '0', // Default wallet
//   manager: 'Unassigned', // Default manager
//   kyc: lead.status, // Assuming status maps to kyc
// });

export default function ReminderPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const {data} = useGetReminder();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await LeadsPageServer({ page, pageLimit, searchValue });

  //     // Transform Leads[] to Client[]
  //     const employees = data.employee.map(mapLeadsToClient);

  //     setResponseData({
  //       employee: employees,
  //       totalUsers: data.totalUsers,
  //       pageCount: data.pageCount,
  //     });
  //   };

  //   fetchData();
  // }, [page, pageLimit, searchValue]);

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
    <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-4 overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="text-[20px] font-bold text-[#042559]">{`Reminders (${data.length})`}</div>

        <div className="flex justify-center item-center gap-4">
        <div className='flex gap-2 items-center'>
          <Input
            placeholder="Search name..."
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
            />

              <div className="bg-[#f21300] text-white max-h-fit max-w-fit rounded-lg cursor-pointer p-1">
                <Plus strokeWidth={"5"}/>
              </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-0 m-0 overflow-x-auto flex flex-col">
        <ReminderTable
          searchKey="search"
          searchValue={searchValue}
          pageNo={page}
          columns={columns}
          totalUsers={data?.length}
          data={data} // Ensure data is of type Client[]
          pageCount={Math.ceil(data.length / pageLimit)}
        />
      </div>
    </div>
  );
}
