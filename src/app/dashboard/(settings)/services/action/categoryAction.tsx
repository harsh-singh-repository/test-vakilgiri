"use client";

import React, { useState } from "react";
import AddCategory from "../_components/addCategory";
import { ImCross } from "react-icons/im";
import { Plus } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "@/components/model/custom-modal";
interface ActionCellProps {
  handleFetch: () => void;
}

export const CategoryActionCell: React.FC<ActionCellProps> = ({ handleFetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-end mr-4">
      {/* Add Button */}
      <button
        onClick={handleOpenModal}
        className="w-6 h-6 bg-[#f21300] text-white rounded flex items-center justify-center"
        title="Add"
      >
         <Plus strokeWidth={"5"} height={16}/>
      </button>

      {/* Modal for Adding Category */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">Create Category</h2>
              <button onClick={handleCloseModal} className="stroke-[#f21300] mb-4 text-[#f21300]">
                <ImCross/>
              </button>
            </div>
            <AddCategory again={handleFetch} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export const CategoryEditCell: React.FC = () => {
  return (
    <div className="flex justify-end mr-4">
      <button
        className="w-[20px] h-[20px] bg-[#091747] text-white rounded flex items-center justify-center hover:bg-[#f21300] hover:text-white"
        title="Edit"
      >
        <FaPencilAlt size={10} />
      </button>
    </div>
  );
};
