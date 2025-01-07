"use client";

import React, { useEffect, useState } from "react";

interface ServiceStatusProps {
  isActive: boolean;
}

export const ServiceStatus: React.FC<ServiceStatusProps> = ({ isActive }) => {
  const [status, setStatus] = useState(isActive ? "Active" : "Inactive");

  useEffect(() => {
    setStatus(isActive ? "Active" : "Inactive");
  }, [isActive]);

  return (
    <div className="flex justify-center items-center">
    <div className="flex justify-center items-center h-[20px] w-[100px]">
      <span
        className={`px-2 py-1 rounded-full text-white text-[10px] font-poppins ${
          status === "Active" ? "bg-[#007321] mr-1" : "bg-[#f21300]"
        }`}
      >
        {status}
      </span>
    </div>
    </div>
  );
};
