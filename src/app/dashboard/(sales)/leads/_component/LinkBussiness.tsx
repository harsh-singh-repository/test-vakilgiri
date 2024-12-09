// import { Button } from '@/components/ui/button'
import React from 'react'

const LinkBussiness = () => {
  return (
    <div className='flex justify-center items-center flex-col p-0'>
        <span className="text-[14px] text-[#091747] font-semibold">
          Link Bussiness
        </span>
        <div className="flex flex-row gap-x-2">
             <button className='bg-[#f21300] hover:bg-[#f21300] px-3 py-2 text-[12px] text-white rounded-md'>Link Bussiness</button>
             <button className='hover:bg-[#f21300] bg-[#091747] px-3 py-2 text-[12px] text-white rounded-md'>Add Bussiness</button>
        </div>
    </div>
  )
}

export default LinkBussiness