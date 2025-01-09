import React from 'react';
import { FiEye } from 'react-icons/fi';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const ActionButton = () => {
  const icons = [
    { id: 'eye', icon: <FiEye /> },
    { id: 'credit-card', icon: <AiOutlineCreditCard /> },
    { id: 'edit', icon: <FiEdit /> },
  ];

  return (
    <div className="flex justify-center items-center gap-1">
      {icons.map((item) => (
        <Button key={item.id} className="bg-[#042559] text-white w-6 h-7 text-sm">
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default ActionButton;

