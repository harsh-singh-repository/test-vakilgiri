"use client"
// import { IoMdMail } from "react-icons/io"
import { FaStackExchange } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { StackBussinessExchangeDialog } from "./StackExchangeDialog"

interface ActionButtonProps {
  id: string;
}
const ActionButton = ({id}:ActionButtonProps) => {
  const [openDialogId, setOpenDialogId] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);

  const router = useRouter()

  const handleEditClick = () => {
    router.push(`/dashboard/business/${id}`)
  }

  return (
    <div className="flex justify-center items-center gap-1">
         <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm" onClick={()=>{
              setOpen(true);
              setOpenDialogId(id);
            }}>
            <FaStackExchange />
          </Button>
          <StackBussinessExchangeDialog open={open} setOpen={setOpen} openDialogId={openDialogId}/>
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={handleEditClick}
      >
        <MdEdit />
      </Button>
    </div>
  )
}

export default ActionButton;