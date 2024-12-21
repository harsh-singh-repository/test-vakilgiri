import { cn } from '@/lib/utils';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | ((closeModal: () => void) => React.ReactNode);
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  // const modalRef = useRef<HTMLDivElement | null>(null);

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

  // const handleOutsideClick = useCallback(
  //   (e: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(e.target as Node) &&
  //       !document.querySelector('[data-ignore-click]')?.contains(e.target as Node) // Adjust based on dropdown class
  //     ) {
  //       onClose();
  //     }
  //   },
  //   [onClose]
  // );

  // useEffect(() => {
  //   if (isModalOpen) {
  //     document.addEventListener('mousedown', handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [isModalOpen, handleOutsideClick]);

  if (!isModalOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50">
      <div
        // ref={modalRef}
        className={cn(
          'bg-white rounded-lg shadow-xl w-full min-w-md mt-16 mb-16 max-h-fit',
          className
        )}
        // Ensure modal content handles propagation
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-2 py-1">
          {typeof children === 'function' ? children(onClose) : children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
