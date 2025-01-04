"use client";

import React, { useState } from "react";
import { Settings, Trash2 } from "lucide-react";
import RoleEditForm from "./roleEditForm";
import { RoleModal } from "./roleEditModal";

interface ActionCellProps {
  rowId: string; 
}

const ActionCell: React.FC<ActionCellProps> = ({rowId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex gap-1 justify-end mr-2">
      <button
        className="w-[25px] h-[25px] bg-[#091747] text-white rounded-md flex items-center justify-center hover:bg-[#f21300] hover:text-white"
        title="Settings"
        onClick={handleOpenModal}
      >
        <Settings size={14} strokeWidth={"2"} />
      </button>
      <button
        className="w-[25px] h-[25px] bg-[#f21300] text-white rounded-md flex items-center justify-center hover:bg-[#091747] hover:text-white"
        title="Delete"
      >
        <Trash2 size={14} strokeWidth={"2"}/>
      </button>
      {isModalOpen && (
        <RoleModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <RoleEditForm close={handleCloseModal} id={rowId} />
          </div>
        </RoleModal>
      )}
    </div>
  );
};

export default ActionCell;
