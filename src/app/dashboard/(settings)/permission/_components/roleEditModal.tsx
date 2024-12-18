import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const RoleModal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 overflow-y-visible">
      <div className="bg-white rounded-md shadow-lg sm:mt-0 md:mt-0 lg:mt-10 xl:mt-20 w-full sm:w-5/6 md:w-1/3 lg:w-1/3 xl:w-1/2 h-auto max-h-screen overflow-y-auto mb-10">
        {children}
      </div>
    </div>,
    document.body 
  );
};
