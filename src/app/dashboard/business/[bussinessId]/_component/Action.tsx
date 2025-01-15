"use client"

import { FaEye, FaStackExchange } from "react-icons/fa"
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useState } from "react"
import Modal from "@/components/model/custom-modal"
import { StackExchangeDialog } from "@/app/dashboard/client/_component/tables/StackExchangeDialog"

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
    router.push(`/dashboard/client/${id}`)
  }

  return (
    <div className="flex justify-center items-center gap-1">
         <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]" onClick={()=>{
              openModal();
              setOpenDialogId(id);
            }}>
            <FaStackExchange />
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-2xl">
              <StackExchangeDialog onClose={closeModal} openDialogId={openDialogId}/>
          </Modal>
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]"
        onClick={handleEditClick}
      >
        <FaEye/>
      </Button>
    </div>
  )
}

export default ActionButton;