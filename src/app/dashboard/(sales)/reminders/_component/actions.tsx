import { Button } from '@/components/ui/button';
import React from 'react'
import { FaStackExchange, FaPencilAlt } from "react-icons/fa"; // if need then add FaWhatsapp,
import { RiDeleteBin6Line } from "react-icons/ri";
const ActionButton = () => {

  return (
    <div className='flex justify-center items-center gap-1'>
      <Button className='bg-[#042559] text-white w-6 h-7 text-sm'>
        {/* <FaWhatsapp /> */}
        <FaPencilAlt/>
      </Button>
      <Button className='bg-[#042559] text-white w-6 h-7 text-sm'>
        <FaStackExchange />
      </Button>
      <Button className='bg-[#f21300] text-white w-6 h-7 text-sm'>
        <RiDeleteBin6Line />
      </Button>
    </div>
  )
}

export default ActionButton
