"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ActionCell from "./_components/action";

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
    cell: () => (
      <div className="flex justify-center ml-1">
      <img src="/globe.svg" alt="Globe Icon" className="h-4 w-4"/>
    </div>
    ),
  },
  {
    id: "action", // Updated id
    header: () => <div className="text-right mr-4">Action</div>, // Updated header
    cell: ({ row }) => <ActionCell rowId={row.id} />
  },
];
