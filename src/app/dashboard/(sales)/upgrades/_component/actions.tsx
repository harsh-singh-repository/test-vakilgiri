"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";
import { FaEye, FaStackExchange } from "react-icons/fa";
import ViewPay from "../action/viewPay";
import Modal from "@/components/model/custom-modal";
import MainView from "../action/mainView";

const ActionButton = () => {
  const icons = [
    { icon: <FaStackExchange size={14} />, bg: "bg-[#091747]", action: "stack" },
    { icon: <FaEye size={14} />, bg: "bg-[#091747]", action: "viewPay" },
    { icon: <FiTrash2 size={14} />, bg: "bg-[#f21300]", action: "delete" },
  ];

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewOpen = () => setIsViewModalOpen(true);
  const handleViewClose = () => setIsViewModalOpen(false);

  const [isStackModalOpen, setIsStackModalOpen] = useState(false);

  const handleStackOpen = () => setIsStackModalOpen(true);
  const handleStackClose = () => setIsStackModalOpen(false);

  const handleButtonClick = (action: string) => {
    switch (action) {
      case "viewPay":
        handleViewOpen();
        break;
      case "delete":
        console.log("Delete action triggered.");
        break;
      case "stack":
        handleStackOpen();
        console.log("Stack action triggered.");
        break;
      default:
        console.warn("Unknown action.");
    }
  };

  return (
    <div className="flex justify-end items-center gap-2">
      {icons.map((item, index) => (
        <Button
          key={index}
          className={`${item.bg} hover:${item.bg} text-white w-[25px] h-[25px] flex items-center justify-center`}
          onClick={() => handleButtonClick(item.action)}
        >
          {item.icon}
        </Button>
      ))}
      {isViewModalOpen && (
        <Modal isOpen={isViewModalOpen} onClose={handleViewClose}>
          <ViewPay close={handleViewClose} />
        </Modal>
      )}
      {isStackModalOpen && (
        <Modal isOpen={isStackModalOpen} onClose={handleStackClose}>
          <MainView close={handleStackClose} />
        </Modal>
      )}
    </div>
  );
};

export default ActionButton;
