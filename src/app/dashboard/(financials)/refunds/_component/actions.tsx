import React from 'react';
import { FaPencilAlt, FaRegCreditCard } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const ActionButton = () => {
  // Define the onClick functions for each button
  const handleFileClick = () => {
    console.log('File button clicked!');
  };

  const handleViewClick = () => {
    console.log('View button clicked!');
  };

  const handleSyncClick = () => {
    console.log('Sync button clicked!');
  };

  return (
    <div className="flex justify-center items-center gap-1">
      {/* File Button - Red */}
      <Button
        onClick={handleFileClick}
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]"
      >
        <FaEye/>
      </Button>

      {/* Eye Button - Blue */}
      <Button
        onClick={handleViewClick}
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]"
      >
        <FaRegCreditCard/>
      </Button>

      {/* Sync Button - Blue */}
      <Button
        onClick={handleSyncClick}
        className="bg-[#031747] text-white w-8 h-8 text-sm flex justify-center items-center hover:bg-[#f21300]"
      >
        <FaPencilAlt/>
      </Button>
    </div>
  );
};

export default ActionButton;
