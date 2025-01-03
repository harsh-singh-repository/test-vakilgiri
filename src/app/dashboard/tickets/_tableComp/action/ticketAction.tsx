"use client";

import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { ImBin } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Ticket } from "../ticketColumn";
import { TicketCategory } from "../../page";
import ViewTicket from "../../_components/viewTicket";
import EditTicket from "../../_components/editTicket";
import Modal from "@/components/model/custom-modal";
import { FormModal } from "@/app/dashboard/(settings)/services/_components/formModal";
import TicketDelete from "./ticketDelete";


interface TicketActionProps {
  ticket: Ticket;
  categories: TicketCategory[];
  tickets: Ticket[];
  handleFetchagain: () => void;
}

const TicketAction: React.FC<TicketActionProps> = ({
  ticket,
  categories,
  tickets,
  handleFetchagain,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleView = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);

  const handleEdit = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

   const [isModalOpen1, setIsModalOpen1] = React.useState(false);
    const handleOpenModal1 = () => {
      console.log("dlt open")
      setIsModalOpen1(true);
    };
  
    const handleCloseModal1 = () => {
      setIsModalOpen1(false);
    };
  return (
    <div className="flex gap-1 justify-end items-center">
      <Button className="bg-[#042559] text-white p-1 h-6 text-md" onClick={handleView}>
        <IoMdEye />
      </Button>

      {isViewModalOpen && (
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
          <ViewTicket
            ticket={ticket}
            close={closeViewModal}
            tickets={tickets}
            handleFetchagain={handleFetchagain}
          />
        </Modal>
      )}

      <Button className="bg-[#042559] text-white p-1 h-6 text-md" onClick={handleEdit}>
        <MdEdit />
      </Button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EditTicket
            data={ticket}
            close={closeModal}
            categories={categories}
            handleFetchagain={handleFetchagain}
          />
        </Modal>
      )}

      <Button className="bg-[#f21300] text-white p-1 h-6 text-sm" onClick={handleOpenModal1}>
        <ImBin />
      </Button>
      {isModalOpen1 && (
          <FormModal isOpen={isModalOpen1} onClose={handleCloseModal1}>
          <TicketDelete  data={ticket} close={handleCloseModal1}/>
        </FormModal>
      )}
    </div>
  );
};

export default TicketAction;
