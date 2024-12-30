"use client";


import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryForm from "../../_components/addCategory";
import Modal from "@/components/model/custom-modal";


interface TicketCategoryActionProps {
  handleFetch: () => void;
}

const TicketCategoryAction: React.FC<TicketCategoryActionProps> = ({ handleFetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-between">
      <div>Name</div>
      <div
        className="bg-[#f21300] text-white p-1 text-sm rounded-md cursor-pointer"
        onClick={handleOpenModal}
      >
        <FaPlus />
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CategoryForm close={handleCloseModal} fetchagain={handleFetch} />
        </Modal>
      )}
    </div>
  );
};

export default TicketCategoryAction;
