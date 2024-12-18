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
    <div className="flex justify-end items-center">
      <span
        className={`px-2 py-1 rounded-full text-white text-xs ${
          status === "Active" ? "bg-green-700 mr-1" : "bg-red-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
};
