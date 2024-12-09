"use client"
import { IoMdMail } from "react-icons/io"
import { FaStackExchange } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { StackExchangeDialog } from './StackExchangeDialog'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {  useState } from "react"


interface ActionButtonProps {
  id: string;
}


const ActionButton = ({id}:ActionButtonProps) => {
  const [openDialogId, setOpenDialogId] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);
  // console.log("id type",typeof((id)))
  

  console.log("open dialog iD",openDialogId);

  const router = useRouter()

  const handleEditClick = () => {
    console.log("id one",id)
    // console.log("id type4",typeof((id)))
    router.push(`/dashboard/client/${id}`)
  }


  // console.log("Harsh",id);



  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={() => {}}
      >
        <IoMdMail />
      </Button>
        {/* <DialogTrigger asChild> */}
          <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm" onClick={()=>{
              setOpen(true);
              setOpenDialogId(id); 
              // console.log("SetDialogID",openDialogId)
            }}>
            <FaStackExchange />
          </Button>
          <StackExchangeDialog open={open} setOpen={setOpen} openDialogId={openDialogId}/>
        {/* </DialogTrigger> */}
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
