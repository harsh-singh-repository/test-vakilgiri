import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import React from 'react'
import { FaWhatsapp, FaStackExchange } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateLeads from './UpdateLeads';
const ActionButton = () => {

  return (
    <div className='flex justify-center items-center gap-1'>
      <Button className='bg-[#00972B] text-white w-6 h-7 text-sm'>
        <FaWhatsapp />
      </Button>
        <Dialog>
          <DialogTrigger>
          <div className='bg-[#091747] text-white p-2 rounded-md'>
            <FaStackExchange className="h-4 w-4"/>
          </div>
          </DialogTrigger>
           <UpdateLeads/>
        </Dialog>
      <Button className='bg-[#f21300] text-white w-6 h-7 text-sm'>
        <RiDeleteBin6Line />
      </Button>
    </div>
  )
}

export default ActionButton
