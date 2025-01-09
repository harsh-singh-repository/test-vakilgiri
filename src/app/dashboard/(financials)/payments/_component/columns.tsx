"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./actions";
import { GetPaymentsInterface} from "@/types";

export const columns: ColumnDef<GetPaymentsInterface>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="text-[14px] text-blue-950 font-medium ml-1">
          {row.original.createdAt.split("T")[0]}
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
          {row.original.projectId}
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
          {row.original.paymentMode}
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
            &#8377;{row.original.amount}
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
        <div className="font-medium ml-1 text-center">
          <span
            className={`px-2 py-1 rounded-full text-white text-[10px] ${
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
    cell: ({row}) => {
      const openDialogId = row.original.id
      return <ActionButton id={openDialogId}/>;
    },
  },
];
