"use client";

import { FormModal } from "@/app/dashboard/(settings)/services/_components/formModal";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryForm from "../../_components/addCategory";


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
        <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CategoryForm close={handleCloseModal} fetchagain={handleFetch} />
        </FormModal>
      )}
    </div>
  );
};

export default TicketCategoryAction;
