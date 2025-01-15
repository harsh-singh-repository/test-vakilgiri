"use client"
import React from 'react'
import EditStaff from '../_component/EditStaff';
import { ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className='p-6'>
        <div className="flex felx-row gap-3 items-center">
              <div className="bg-[#042559] text-white cursor-pointer max-w-fit px-1 py-1 rounded-md" onClick={()=>router.push(`/dashboard/staff`)}>
                  <ChevronsLeft className="h-4 w-4"/>
              </div>
              <div className='text-2xl font-medium text-[#031747]'>Edit Staff Details</div>
        </div>
      <EditStaff/>
    </div>
  )
}

export default Page;