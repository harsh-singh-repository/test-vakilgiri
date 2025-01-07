"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { TicketCategory } from "../page";
import TicketCategoryAction from "./action/ticketCategoryAction";


export const TicketCategoryColumns: (handleFetch: () => void) => ColumnDef<TicketCategory>[] = (handleFetch) => [
  {
    accessorKey: "sn",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-blue-950 ml-2 font-semibold">
          {row.original.sn}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <TicketCategoryAction handleFetch={handleFetch} />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm text-blue-950 font-semibold">
            {row.original.name}
          </div>
          <div className="text-xs text-red-600 font-semibold">
            {row.original.type.replace("[", "").replace("]", "").replace(`"`, "").replace(`"`, "")}
          </div>
        </div>
      );
    },
  },
];
