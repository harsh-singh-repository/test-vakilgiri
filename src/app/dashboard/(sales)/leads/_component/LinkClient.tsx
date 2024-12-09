import { MaterialInput } from '@/components/material-input'
import { Button } from '@/components/ui/button'
import React from 'react'

const LinkClient = () => {
  return (
    <div className='p-0'>
       <div className="flex flex-col justify-center items-center w-full gap-y-1">
          <span className='font-semibold text-[14px] text-[#091747]'>Link User</span>
          <MaterialInput placeholder='Email' className='w-[250px]'/>
          <Button className='bg-[#f21300] w-[250px] text-white font-[12px] hover:bg-[#f21300]'>Link User</Button>
       </div>
    </div>  
  )
}

export default LinkClient