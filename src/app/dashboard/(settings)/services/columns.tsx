import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Services } from "./types";
import { ServiceStatus } from "./action/serviceStatus";
import { ServiceAction } from "./action/serviceAction";
// import { getSession } from "next-auth/react";


export const columns: (
  onToggle: (id: string, newActive: boolean) => void,
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
) => ColumnDef<Services>[] = (onToggle, setFetchAgain) => [
  {
    accessorKey: "Icon",
    header: () => <div className="ml-2 text-left">Icon</div>,
    cell: ({ row }) => {
      const iconUrl = `${process.env.NEXT_PUBLIC_ICON_URL}/${row.getValue("Icon")}`;
      return (
        <div className="ml-2 text-left">
          <img src={iconUrl} alt="Service Icon" className="h-8 w-8" />
        </div>
      );
    },
  },
  {
    accessorKey: "ServiceId",
    header: () => <div className="text-left">Service id</div>,
    cell: ({ row }) => (
      <div className="text-left text-[#091747] text-[14px] font-medium ml-1">
        {row.getValue("ServiceId")}
      </div>
    ),
  },
  {
    accessorKey: "ServiceName",
    header: () => <div className="text-left">Service Name</div>,
    cell: ({ row }) => (
      <div className="text-left flex flex-col gap-0.5">
        <div className="text-[14px] leading-none text-[#091747] font-medium">
          {row.getValue("ServiceName")}
        </div>
        <div className="text-[10px] font-medium text-[#f21300] leading-none">
          {row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "projects",
    header: () => <div className="flex justify-center items-center">Projects</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center text-[#091474] font-medium text-[14px]">
        {row.getValue("projects")}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: () => <div className="flex justify-end items-center mr-3">Active</div>,
    cell: ({ row }) => {
      const isActive: boolean = row.getValue("active");  // Explicitly type as boolean
      const handleSwitchChange = () => {
        onToggle(row.original.id, !isActive);
      };
    
      return (
        <div className="flex justify-end items-center mr-3">
          <label className="relative inline-block w-10 h-5">
            <input
              type="checkbox"
              className="peer hidden"
              checked={isActive}  // `isActive` is now explicitly a boolean
              onChange={handleSwitchChange}
            />
            <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-red-500"></span>
            <span className="absolute w-4 h-4 bg-white rounded-full left-0.5 bottom-0.5 transition-transform duration-300 peer-checked:translate-x-5"></span>
          </label>
        </div>
      );
    }
  },  
  {
    accessorKey: "status",
    header: () => <div className="flex justify-end items-center mr-1">Status</div>,
    cell: ({ row }) => (
      <ServiceStatus isActive={row.getValue("active")} />
    ),
  },
  {
    id: "action",
    header: () => <div className="flex justify-end items-center mr-3">Action</div>,
    cell: ({ row }) => (
      <ServiceAction
        original={row.original}
        setFetchAgain={setFetchAgain}
        onToggle={onToggle}
      />
    ),
  },
];
