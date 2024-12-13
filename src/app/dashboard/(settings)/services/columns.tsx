"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CogIcon, EyeIcon, Icon } from "lucide-react";
import React from "react";
import { Modal } from "./_components/modal";
import EditServices from "./_components/editServices";
import { Services } from "./types";
import { getSession } from "next-auth/react";


export const columns: (onToggle: (id: string, newActive: boolean) => void, setFetchagain: React.Dispatch<React.SetStateAction<boolean>>) => ColumnDef<Services>[] = (onToggle,setFetchagain) =>  [
  {
    accessorKey: "Icon",
    header: () => <div className="ml-2 text-left">Icon</div>,
    cell: ({ row }) => {
      // Construct the full icon URL
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
        <div className="text-left text-blue-950 font-medium">{row.getValue("ServiceId")}</div>
      ),
    },
    {
        accessorKey: "ServiceName",
        header: () => <div className="text-left">Service Name</div>,
        cell: ({ row }) => (
          <div className="text-left">
            <div className="text-sm leading-none text-blue-950 font-medium">
              {row.getValue("ServiceName")}
            </div>
            <div className="text-xs font-medium text-red-500 leading-none">
              {row.original.description}
            </div>
          </div>
        ),
      },
    {
      accessorKey: "projects",
      header: () => <div className="flex justify-center items-center">Projects</div>,
      cell: ({ row }) => {
        const project: number = row.getValue("projects");
        return (
          <div className="flex justify-center items-center text-blue-950 font-medium">{project}</div>
        );
      },
    },
    {
      accessorKey: "active",
      header: () => <div className="flex justify-end items-center mr-3">Active</div>,
      cell: ({ row }) => {
        const isActive = row.getValue("active");
        const handleSwitchChange = () => {
          onToggle(row.original.id, !isActive); 
        };
      
        return (
          <div className="flex justify-end items-center mr-3">
            <label className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isActive===true}
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
      header: () => <div className="flex justify-end items-center">Status</div>,
      cell: ({ row }) => {
        const [status, setStatus] = React.useState<string>(
          row.getValue("active") ? "Active" : "Inactive"
        );
    
        React.useEffect(() => {
          // Update the status based on the "active" field
          const isActive = row.getValue("active");
          setStatus(isActive ? "Active" : "Inactive");
          console.log(isActive)
        }, [row.getValue("active")]); // Dependency on the "active" field
    
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
      },
    },
    {
      id: "action",
      header: () => <div className="flex justify-end items-center mr-3">Action</div>,
      cell: ({ row }) => {
        const [isModalOpen, setIsModalOpen] = React.useState(false);
    
        const handleEdit = () => {
          setIsModalOpen(true);
        };
    
        const closeModal = () => {
          setFetchagain(true);
          setIsModalOpen(false);
        };
    
        return (
          <div className="flex justify-end items-center space-x-1">
            <Button
              className="bg-blue-950 text-white rounded-md p-2 hover:bg-red-600 hover:text-white"
              variant="ghost"
            >
              <EyeIcon className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleEdit}
              className="bg-blue-950 text-white rounded-md p-2 hover:bg-red-600 hover:text-white"
              variant="ghost"
            >
              <CogIcon className="h-5 w-5 stroke-white" 
                    style={{ strokeWidth: '3px' }} />
            </Button>
    
            {/* Modal */}
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <EditServices data={row.original} close={closeModal} onToggle={onToggle}/>
              </Modal>
            )}
          </div>
        );
      },
    },
    
  ];
  
