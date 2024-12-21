import { Button } from '@/components/ui/button';
import React, {useState} from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt } from 'react-icons/fa';
import Modal from '@/components/model/custom-modal';
import EditStaff from '../EditStaff';


const ActionButton: React.FC = () => { 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm" onClick={openModal}>
        <FaPencilAlt/>
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} className="p-4"> 
           <EditStaff onClose={closeModal}/>                 
      </Modal>
      <Button className="bg-[#f21300] text-white w-6 h-7 text-sm">
        <RiDeleteBin6Line />
      </Button>
    </div>
  );
};

export default ActionButton;

