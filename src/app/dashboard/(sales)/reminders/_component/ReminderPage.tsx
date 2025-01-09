'use client';
import { useState} from 'react';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useGetReminder } from '@/hooks/reminder/manage-reminder';
import { ReminderTable } from './leads-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { Oval } from 'react-loader-spinner';

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

  console.log(data)
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
        <div className="text-xl font-semibold text-[#042559]">{`Reminders (${data.length})`}</div>

        <div className="flex justify-center item-center gap-4">
        <div className='flex gap-2 items-center'>
          <Input
            placeholder="Type here..."
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white p-[5px] text-[14px] lg:w-[249px] h-[30px] placeholder:text-black/40"
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
