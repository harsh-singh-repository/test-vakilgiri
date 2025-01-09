"use client"
import { Button } from '@/components/ui/button'
import { FaEye, FaPencilAlt, FaRegCreditCard } from 'react-icons/fa';
import {  useState } from "react"
import Modal from "@/components/model/custom-modal"
import PaymentDetailCard from './PaymentDetailCard';


interface ActionButtonProps {
  id: string;
}


const ActionButton = ({id}:ActionButtonProps) => {
  const [openDialogId, setOpenDialogId] = useState<string>("");
  // const [open,setOpen] = useState<boolean>(false);
  // console.log("id type",typeof((id)))

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  

  console.log("open dialog iD",openDialogId);
  


  // console.log("Harsh",id);



  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]"
        onClick={()=>{
          openModal();
          setOpenDialogId(id); 
          // console.log("SetDialogID",openDialogId)
        }}
      >
        <FaEye />
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-2xl">
             <PaymentDetailCard onClose={closeModal} openDialogId={id}/>
          </Modal>
          <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]" >
            <FaRegCreditCard/>
          </Button>
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]"
      >
        < FaPencilAlt/>
      </Button>
    </div>
  )
}

export default ActionButton;

