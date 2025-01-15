import React, { useState } from 'react';
import { FaPencilAlt, FaRegCreditCard } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Modal from '@/components/model/custom-modal';
import PaymentDetailCard from './PaymentDetailCard';

const ActionButton = ({openDialogId}:{openDialogId:string}) => {
  // Define the onClick functions for each button

  const handleViewClick = () => {
    console.log('View button clicked!');
  };

  const handleSyncClick = () => {
    console.log('Sync button clicked!');
  };


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="flex justify-center items-center gap-1">
      {/* File Button - Red */}
      <Button
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]" onClick={()=>openModal()}
      >
        <FaEye/>
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-2xl">
        <PaymentDetailCard onClose={closeModal} openDialogId={openDialogId}/>
      </Modal>

      {/* Eye Button - Blue */}
      <Button
        onClick={handleViewClick}
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]"
      >
        <FaRegCreditCard/>
      </Button>

      {/* Sync Button - Blue */}
      <Button
        onClick={handleSyncClick}
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]"
      >
        <FaPencilAlt/>
      </Button>
    </div>
  );
};

export default ActionButton;
