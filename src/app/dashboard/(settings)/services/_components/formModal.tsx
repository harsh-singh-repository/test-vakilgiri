import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg relative mt-20 w-1/6 h-fit overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:red-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body 
  );
};
