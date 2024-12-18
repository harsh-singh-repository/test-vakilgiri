"use client";

import React, { useState } from "react";
import { SmallModal } from "../../_components/smallModal";
import ShowCreator from "../../_components/showCreator";


interface TicketCreatorProps {
  creator: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    pan: string;
    address1: string;
    address2: string;
    alternateMobileNumber: string;
  };
}

const TicketCreator: React.FC<TicketCreatorProps> = ({ creator }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="text-[#f21300] text-sm font-medium cursor-pointer"
        onClick={handleOpenModal}
      >
        {`${creator.firstName.toUpperCase()} ${creator.lastName.toUpperCase()}`}
      </div>

      {isModalOpen && (
        <SmallModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ShowCreator data={creator} />
        </SmallModal>
      )}
    </div>
  );
};

export default TicketCreator;
