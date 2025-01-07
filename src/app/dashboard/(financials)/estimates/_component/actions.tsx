import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FaSyncAlt } from 'react-icons/fa';
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
        className="bg-red-600 text-white w-8 h-8 text-sm flex justify-center items-center"
      >
        <FaFileAlt />
      </Button>

      {/* Eye Button - Blue */}
      <Button
        onClick={handleViewClick}
        className="bg-[#042559] text-white w-8 h-8 text-sm flex justify-center items-center"
      >
        <FaEye />
      </Button>

      {/* Sync Button - Blue */}
      <Button
        onClick={handleSyncClick}
        className="bg-[#042559] text-white w-8 h-8 text-sm flex justify-center items-center"
      >
        <FaSyncAlt />
      </Button>
    </div>
  );
};

export default ActionButton;
