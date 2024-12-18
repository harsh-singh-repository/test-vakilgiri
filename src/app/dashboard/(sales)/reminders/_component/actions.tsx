"use client"
import Modal from '@/components/model/custom-modal';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaStackExchange, FaPencilAlt } from "react-icons/fa"; // if need then add FaWhatsapp,
import { RiDeleteBin6Line } from "react-icons/ri";
import { StackReminderDialog } from './StackReminderDialog';
const ActionButton = ({id}:{id:string}) => {

  const [openDialogId, setOpenDialogId] = useState<string>(""); // State for dialog ID
  // const [open, setOpen] = useState<boolean>(false); // State for open/close dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex justify-center items-center gap-1'>
      <Button className='bg-[#042559] text-white w-6 h-7 text-sm'>
        {/* <FaWhatsapp /> */}
        <FaPencilAlt/>
      </Button>
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={() => {
          openModal(); // Open the dialog
          setOpenDialogId(id); // Set the dialog ID with the prop value
        }}
      >
        <FaStackExchange />
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
         <StackReminderDialog openDialogId={openDialogId} onClose={closeModal}/> 
      </Modal>
      <Button className='bg-[#f21300] text-white w-6 h-7 text-sm'>
        <RiDeleteBin6Line />
      </Button>
    </div>
  )
}

export default ActionButton
