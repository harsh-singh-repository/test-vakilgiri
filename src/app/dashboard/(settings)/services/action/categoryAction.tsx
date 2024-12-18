"use client";

import React, { useState } from "react";
import { PlusIcon, EditIcon } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FormModal } from "../_components/formModal";
import AddCategory from "../_components/addCategory";

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
        className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center"
        title="Add"
      >
        <PlusIcon size={16} />
      </button>

      {/* Modal for Adding Category */}
      {isModalOpen && (
        <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">Create Category</h2>
              <button onClick={handleCloseModal} className="stroke-red-600 mb-4">
                <Cross2Icon />
              </button>
            </div>
            <AddCategory again={handleFetch} />
          </div>
        </FormModal>
      )}
    </div>
  );
};

export const CategoryEditCell: React.FC = () => {
  return (
    <div className="flex justify-end mr-4">
      <button
        className="w-8 h-8 bg-blue-950 text-white rounded flex items-center justify-center hover:bg-red-600 hover:text-white"
        title="Edit"
      >
        <EditIcon size={16} />
      </button>
    </div>
  );
};
