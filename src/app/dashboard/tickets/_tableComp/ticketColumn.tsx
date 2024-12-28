"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TicketCategory } from "../page";
import React from "react";
import TicketAction from "./action/ticketAction";
import TicketCreator from "./action/ticketCreatorAction";

interface TicketCreator{
  firstName:string;
  lastName:string;
  email:string;
  mobileNumber:string;
  pan:string;
  address1:string;
  address2:string;
  alternateMobileNumber:string;
}

export type Ticket = {
    sn:string;
    id: string;
    body: string;
    status: string;
    subject: string;
    leadId: string | null;
    businessId: string;
    projectId: string | null;
    serviceId: string | null;
    userId: string | null;
    ticketFile: string | null;
    categoryId: string;
    createdAt: string;
    modifiedAt: string;
    slug: string | null;
    managerId: string | null;
    creatorId: string;
    creator:TicketCreator;
    category:TicketCategory;
}
// export const categoryColumn:(handleFetch:()=>void)=> ColumnDef<category>[] =(handleFetch)=> [
export const TicketColumns:(categories:TicketCategory[],tickets:Ticket[], handleFetchagain:()=>void)=> ColumnDef<Ticket>[] =(categories,tickets,handleFetchagain)=> [
  {
    accessorKey: "profile",
    header: ()=>{
      return <div className="text-blue-950">Profile</div>
    },
    cell:({row})=>{
      return (
        <div className="rounded-full"><img src={`${process.env.NEXT_PUBLIC_ICON_URL}/${row.original.ticketFile}`}></img></div>
      )
    }
  },
  {
    accessorKey: "ticketId",
    header: "Ticket ID",
    cell:({row})=>{
      return (
        <div className="flex flex-col">
          <div className="text-[#091747] text-sm font-semibold">{row.original.sn}</div>
          <div className="text-[#091747] text-sm font-medium">
  {new Date(row.original.modifiedAt).toLocaleDateString('en-GB').replaceAll('/','-')}
</div>
          </div>
      )
    }
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => {
      return <TicketCreator creator={row.original.creator} />;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell:({row})=>{
      const matchedCategory = categories.find((cat) => cat.id === row.original.categoryId);
      console.log(matchedCategory,2)
    // const id = matchedCategory?.id;
        return (
          <div className="text-[#091747] text-sm font-medium">
            {matchedCategory?.name}
          </div>
        )
    }
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell:({row})=>{
        return (
          <div className="text-[#091747] text-sm font-medium">{row.original.subject}</div>
        )
    }
  },
  {
    accessorKey: "manager",
    header: "Manager",
  },
  {
    accessorKey: "status",
    header: ()=>{
      return (
        <div className="flex items-center justify-center">Status</div>
      )
    },
    cell:({row})=>{
        return (
          <div className="flex justify-center items-center">
            {
              row.original.status==='Open' && <div className="bg-[#f21300] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">Open</div>
              ||
              row.original.status==='Closed' && <div className="bg-[#008626] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">Closed</div>
              ||
              row.original.status==='New' && <div className="bg-[#bdbdbd] text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">New</div>
            }
          </div>
        )
    }
  },
  {
    accessorKey: "action",
    header: () => <div className="text-right mr-2">Action</div>,
    cell: ({ row }) => {
      return (
        <TicketAction
          ticket={row.original}
          categories={categories}
          tickets={tickets}
          handleFetchagain={handleFetchagain}
        />
      );
    },
  },
  
]
