import React from 'react'
import { IoMdMail } from "react-icons/io";
import { FaStackExchange } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Button } from '@/components/ui/button';
const ActionButton = () => {

    const icons = [
        <FaStackExchange />,
        <MdEdit />
    ]
  return (
    <div className='flex justify-start items-start gap-1'>
      {
        icons.map((item, index) => {
            return (
                <Button key={index} className='bg-[#042559] text-white w-6 h-7 text-sm'>
                    {item}
                </Button>
            )
        })
      }
    </div>
  )
}

export default ActionButton
