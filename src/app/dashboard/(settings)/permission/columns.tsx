"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Settings, Trash2 } from "lucide-react"; 

export type role = {
  Sno: number;
  userType: string;
  role: string;
  department: string;
  Assigned: string;
};

export const roleColumn: ColumnDef<role>[] = [
  {
    accessorKey: "Sno",
    header: () => <div className="text-left">S.No</div>,
    cell: ({ row }) => <div className="text-left ml-3">{row.getValue("Sno")}</div>,
  },
  {
    accessorKey: "userType",
    header: () => <div className="text-left">User Type</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("userType")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left">Role</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "department",
    header: () => <div className="text-center">Department</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <div className="text-left max-w-[100px] w-full">{row.getValue("department")}</div>
      </div>
    ),
  },
  {
    accessorKey: "Assigned",
    header: () => <div className="text-center">Assigned</div>,
    cell: ({ row }) => (
      <div className="flex justify-center ml-1">
      <img src="/globe.svg" alt="Globe Icon" className="h-4 w-4"/>
    </div>
    ),
  },
  {
    id: "action", // Updated id
    header: () => <div className="text-right mr-4">Action</div>, // Updated header
    cell: () => (
      <div className="flex gap-1 justify-end mr-2">
        <button
          className="w-8 h-8 bg-blue-950 text-white rounded-md flex items-center justify-center hover:bg-red-600 hover:text-white"
          title="Settings"
        >
          <Settings size={16} />
        </button>
        <button
          className="w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-blue-950 hover:text-white"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
