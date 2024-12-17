"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon, EditIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Update path as needed
import AddCategory from "./_components/addCategory";
import { FormModal } from "./_components/formModal";
import { Cross2Icon } from "@radix-ui/react-icons";

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
    header: () => {
      const [isModalOpen, setIsModalOpen] = React.useState(false);
  
      const handleOpenModal = () => setIsModalOpen(true);
      const handleCloseModal = () => setIsModalOpen(false);
  
      return (
        <div className="flex justify-end mr-4">
          <button
            onClick={handleOpenModal}
            className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center"
            title="Add"
          >
            <PlusIcon size={16} />
          </button>
  
          {isModalOpen && (
            <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <div className="p-4">
                <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-4">Create Category</h2>
                <button onClick={handleCloseModal} className="stroke-red-600 mb-4"><Cross2Icon/></button>
                </div>
                <AddCategory again={handleFetch}/>
              </div>
            </FormModal>
          )}
        </div>
      );
    },
    cell: () => (
      <div className="flex justify-end mr-4">
        <button
          className="w-8 h-8 bg-blue-950 text-white rounded flex items-center justify-center hover:bg-red-600 hover:text-white"
          title="Edit"
        >
          <EditIcon size={16} />
        </button>
      </div>
    ),
  }
  
  
];
