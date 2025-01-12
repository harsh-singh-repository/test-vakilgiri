import React from "react";
import { FaEye } from "react-icons/fa";

// Define the type for the UpgradeItem props
interface UpgradeItemProps {
  date: string;
  name: string;
  amount: string;
  status: string;
  statusColor: string;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ date, name, amount, status, statusColor }) => {
  return (
    <div className="flex items-center justify-between bg-[#F5F5F5] rounded-md p-1 mb-1 px-2">
      {/* User Info and Details */}
      <div className="flex items-center gap-1">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div>
          <div className="text-[10px] text-[#FF0000]">{date}</div>
          <div className="text-[12px] text-[#091747] font-semibold">
            {name} - ₹{amount}
          </div>
          <div className="text-[10px] text-[#091747]">{name}</div>
          <div
            className="mt-0.5 px-1 py-0.5 text-[8px] rounded-full text-white"
            style={{ backgroundColor: statusColor }}
          >
            {status}
          </div>
        </div>
      </div>

      {/* Eye Icon */}
      <div className="bg-[#091747] w-[20px] h-[20px] flex items-center justify-center rounded-md">
        <FaEye className="text-white text-[10px]" />
      </div>
    </div>
  );
};

const RelatedUpgrades = () => {
  const upgrades = [
    {
      date: "08-01-2025, 1:27 pm",
      name: "-",
      amount: "0.00",
      status: "Pending Approval",
      statusColor: "#F7B500", // Yellow
    },
    {
      date: "07-01-2025, 5:03 pm",
      name: "parag",
      amount: "0.00",
      status: "Completed",
      statusColor: "#27AE60", // Green
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#091747] text-white text-[12px] font-medium p-1 rounded-lg px-4">
        Related Upgrades
      </div>

      {/* Upgrade List */}
      <div className="p-1">
        {upgrades.map((upgrade, index) => (
          <UpgradeItem
            key={index}
            date={upgrade.date}
            name={upgrade.name}
            amount={upgrade.amount}
            status={upgrade.status}
            statusColor={upgrade.statusColor}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedUpgrades;
