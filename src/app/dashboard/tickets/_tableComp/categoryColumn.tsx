"use client"

import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { Row } from "react-day-picker"
import { FaPlus } from "react-icons/fa"
import { FormModal } from "../../(settings)/services/_components/formModal"
import CategoryForm from "../_components/addCategory"
import Modal from "@/components/model/custom-modal"

export type TicketCategory = {
  sn:string
  id: string
  name: string
  type:string
}

export const TicketCategoryColumns: (handleFetch: () => void) => ColumnDef<TicketCategory>[] = (handleFetch) => [
    {
        accessorKey: "sn",
        header: "ID",
        cell:({row})=>{
            return (
                <div className="text-sm text-blue-950 ml-2 font-semibold">
                    {row.original.sn}
                </div>
            )
        }
      },
  {
    accessorKey: "name",
    header: ()=>{
         const [isModalOpen, setIsModalOpen] = React.useState(false);
              const handleOpenModal = () => setIsModalOpen(true);
              const handleCloseModal = () => setIsModalOpen(false);
        return (
            <>
            <div className="flex justify-between">
                    <div>Name</div>
                    <div className="bg-[#f21300] text-white p-1 text-sm rounded-md cursor-pointer" onClick={handleOpenModal}>
                                <FaPlus/>
                    </div>
            </div>
            {isModalOpen && (
                                            <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
                                            <CategoryForm close={handleCloseModal} fetchagain={handleFetch}/>
                                            </FormModal>
                                )}
            </>
        )
    },
    cell:({row})=>{
        return (
            <div className="flex flex-col gap-1">
            <div className="text-sm text-blue-950 font-semibold">
                {row.original.name}
            </div>
            <div className="text-xs text-red-600 font-semibold">
            {row.original.type.replace('[','').replace(']','').replace(`"`,'').replace(`"`,'')}
            </div>
            </div>
        )
    }
  }

]
