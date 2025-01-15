import { Button } from '@/components/ui/button';
import { useDeleteLeads } from '@/hooks/leads/manage-leads';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaWhatsapp, FaStackExchange } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'sonner';
import { StackLeadsExchangeDialog } from './StackLeadsExchangeDialog';
import Modal from '@/components/model/custom-modal';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps{
  id:string,
}
const ActionButton: React.FC<ActionButtonProps> = ({ id }) => { 

  const query = useQueryClient();

  const [loader,setLoader] = useState(false);
  
  const {mutate:deleteLeads} = useDeleteLeads();// Destructure id from props

  const [openDialogId, setOpenDialogId] = useState<string>(""); // State for dialog ID
  // const [open, setOpen] = useState<boolean>(false); // State for open/close dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteLeads = (id:string)=>{
    console.log("My id",id);
    setLoader(true);
     deleteLeads(id,{
      onSuccess:()=>{
        setLoader(false);
        toast.success(`Leads Deleted Successfully`)
        query.invalidateQueries({queryKey:["leads"]})
      },
      onError:(error)=>{
        setLoader(false);
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to delete Lead: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      }
     })
  }

  return (
    <div className="flex justify-center items-center gap-1">
      <Button className="bg-[#00972B] text-white w-6 h-7 text-sm">
        <FaWhatsapp />
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
      <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-2xl">
         <StackLeadsExchangeDialog openDialogId={openDialogId} onClose={closeModal}/> 
      </Modal>
      <Button className="bg-[#f21300] text-white w-6 h-7 text-sm" onClick={()=>handleDeleteLeads(id)}>
      {loader ? <Loader2 className="animate-spin" /> : <RiDeleteBin6Line/>}
      </Button>
    </div>
  );
};

export default ActionButton;
