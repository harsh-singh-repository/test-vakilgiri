"use client"
import Modal from '@/components/model/custom-modal';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaStackExchange, FaPencilAlt } from "react-icons/fa"; // if need then add FaWhatsapp,
import { RiDeleteBin6Line } from "react-icons/ri";
import { StackExchangeDialog } from '@/app/dashboard/client/_component/tables/StackExchangeDialog';
import { StackBussinessExchangeDialog } from '@/app/dashboard/business/_component/tables/StackExchangeDialog';
import { StackLeadsExchangeDialog } from '../../leads/_component/table/StackLeadsExchangeDialog';
import { useGetDeleteReminder } from '@/hooks/reminder/manage-reminder';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
const ActionButton = ({id,dialogType,reminderId}:{id:string,dialogType:string,reminderId:string}) => {

  const query = useQueryClient();

  const [loader,setLoader] = useState(false);

  const [openDialogId, setOpenDialogId] = useState<string>(""); // State for dialog ID
  
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const {mutate:deleteReminder} = useGetDeleteReminder()
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onHandleDeleteClick = (id:string) =>{
    setLoader(true)
   deleteReminder(id,{
     onSuccess:()=>{
      setLoader(false);
      toast.success("Reminder Deleted");
      query.invalidateQueries({queryKey:["reminder"]})
    },
    onError: (error) => {
      setLoader(false)
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";

        toast.error(`Failed to delete Reminder: ${errorMessage}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
   })
  }

  return (
    <div className='flex justify-center items-center gap-1'>
            <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]"
        onClick={() => {
          openModal(); // Open the dialog
          setOpenDialogId(id); // Set the dialog ID with the prop value
        }}
      >
        <FaStackExchange />
      </Button>
      <Button className='bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]'>
        <FaPencilAlt/>
      </Button>
      {dialogType === "client" && <Modal isOpen={isModalOpen} onClose={closeModal}>
         <StackExchangeDialog onClose={closeModal} openDialogId={openDialogId}/>
      </Modal> }

      {dialogType === "business" && <Modal isOpen={isModalOpen} onClose={closeModal}>
         <StackBussinessExchangeDialog onClose={closeModal} openDialogId={openDialogId}/>
      </Modal> }

      {dialogType === "lead" && <Modal isOpen={isModalOpen} onClose={closeModal}>
         <StackLeadsExchangeDialog onClose={closeModal} openDialogId={openDialogId}/>
      </Modal> }

      <Button className='bg-[#f21300] text-white w-6 h-7 text-sm' onClick={()=>{onHandleDeleteClick(reminderId)}}>
      {loader ? <Loader2 className="animate-spin" /> : <RiDeleteBin6Line/>}
      </Button>
    </div>
  )
}

export default ActionButton
