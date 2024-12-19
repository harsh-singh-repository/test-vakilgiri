"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
// import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Update path as needed
import { CategoryActionCell, CategoryEditCell } from "./action/categoryAction";

export type category = {
  id:string;
  Icon: string;
  code: string;
  name: string;
  description: string;
};

export const categoryColumn:(handleFetch:()=>void)=> ColumnDef<category>[] =(handleFetch)=> [
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
    accessorKey: "category",
    header: () => <div className="text-left ml-4">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left flex flex-col gap-1 ml-4 mr-2">
          <div className="text-sm font-bold text-red-500 leading-none">
            {row.original.code}
          </div>
          <div className="text-md leading-none">{row.original.name}</div>
          <div className="text-sm leading-none">{row.original.description}</div>
        </div>
      );
    },
  },
  {
    id: "action",
    header: () => <CategoryActionCell handleFetch={handleFetch} />,
    cell: () => <CategoryEditCell />,
  },
  
  
];
