import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface SmallModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const SmallModal: React.FC<SmallModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-md mt-40 shadow-lg relative w-1/4 p-4 max-h-[70vh] overflow-auto transform translate-y-[-20%]"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button> */}
        {children}
      </div>
    </div>,
    document.body
  );
};
