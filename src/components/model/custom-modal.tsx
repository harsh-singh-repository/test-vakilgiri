import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | ((closeModal: () => void) => React.ReactNode);
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-fit mt-16 mb-16 max-h-fit">
        {/* {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
        )} */}
        <div className="px-2 py-1">
          {typeof children === 'function' ? children(onClose) : children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

