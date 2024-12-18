"use client";

import React, { useState } from "react";
import { Settings, Trash2 } from "lucide-react";
import RoleEditForm from "./roleEditForm";
import { RoleModal } from "./roleEditModal";

interface ActionCellProps {
  rowId: string | number; // You can use this to identify the row if needed
}

const ActionCell: React.FC<ActionCellProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex gap-1 justify-end mr-2">
      <button
        className="w-8 h-8 bg-blue-950 text-white rounded-md flex items-center justify-center hover:bg-red-600 hover:text-white"
        title="Settings"
        onClick={handleOpenModal}
      >
        <Settings size={16} />
      </button>
      <button
        className="w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-blue-950 hover:text-white"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
      {isModalOpen && (
        <RoleModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <RoleEditForm close={handleCloseModal} />
          </div>
        </RoleModal>
      )}
    </div>
  );
};

export default ActionCell;
