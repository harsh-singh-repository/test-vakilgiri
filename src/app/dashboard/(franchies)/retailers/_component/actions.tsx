import React from 'react'
import { FiEye } from 'react-icons/fi';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
const ActionButton = () => {

    const icons = [
        <FiEye />,
        <AiOutlineCreditCard />,
        <FiEdit />
    ]
  return (
    <div className='flex justify-center items-center gap-1'>
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
