"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CogIcon, EyeIcon } from "lucide-react";
import { Services } from "../types";
import { Modal } from "../_components/modal";
import EditServices from "../_components/editServices";

interface ServiceActionProps {
  original: Services;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  onToggle: (id: string, newActive: boolean) => void;
}

export const ServiceAction: React.FC<ServiceActionProps> = ({
  original,
  setFetchAgain,
  onToggle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => setIsModalOpen(true);

  const closeModal = () => {
    setFetchAgain(true);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-end items-center space-x-1">
      {/* View Button */}
      <Button
        className="bg-blue-950 text-white rounded-md p-2 hover:bg-red-600 hover:text-white"
        variant="ghost"
      >
        <EyeIcon className="h-5 w-5" />
      </Button>

      {/* Edit Button */}
      <Button
        onClick={handleEdit}
        className="bg-blue-950 text-white rounded-md p-2 hover:bg-red-600 hover:text-white"
        variant="ghost"
      >
        <CogIcon
          className="h-5 w-5 stroke-white"
          style={{ strokeWidth: "3px" }}
        />
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EditServices data={original} close={closeModal} onToggle={onToggle} />
        </Modal>
      )}
    </div>
  );
};
