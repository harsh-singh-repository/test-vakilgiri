"use client"
// import { IoMdMail } from "react-icons/io"
import { FaStackExchange } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { StackBussinessExchangeDialog } from "./StackExchangeDialog"
import Modal from "@/components/model/custom-modal"

interface ActionButtonProps {
  id: string;
}
const ActionButton = ({id}:ActionButtonProps) => {
  const [openDialogId, setOpenDialogId] = useState<string>("");
  // const [open,setOpen] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const router = useRouter()

  const handleEditClick = () => {
    router.push(`/dashboard/business/${id}`)
  }

  return (
    <div className="flex justify-center items-center gap-1">
         <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm" onClick={()=>{
              openModal();
              setOpenDialogId(id);
            }}>
            <FaStackExchange />
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
             <StackBussinessExchangeDialog openDialogId={openDialogId} onClose={closeModal}/>
          </Modal>
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