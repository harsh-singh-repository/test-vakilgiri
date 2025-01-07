"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./actions";
import { Project } from "./ClientPageServer";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.date}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentId",
    header: "Payment ID",
    cell: ({ row }) => {
      const paymentId = row.index;
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {`PAY${paymentId+1}`}
        </div>
      );
    },
  },
  {
    accessorKey: "estimateId",
    header: "Estimate ID",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.invoiceId}
        </div>
      );
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.project}
        </div>
      );
    },
  },
  {
    accessorKey: "mode",
    header: "Mode",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.business}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.amount}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1 text-center">
          <span
            className={`px-2 py-1 rounded-full text-white text-[13px] ${
              row.original.status === "Completed"
                ? "bg-[#007321] mr-1"
                : "bg-[#f21300]"
            }`}
          >
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => {
      return <div className="text-center">Action</div>;
    },
    cell: () => {
      return <ActionButton />;
    },
  },
];
