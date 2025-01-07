import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
// import { ImCross } from "react-icons/im";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const FormModal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 w-full flex items-start justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg relative mt-20 h-fit overflow-hidden">
        {children}
      </div>
    </div>,
    document.body 
  );
};
