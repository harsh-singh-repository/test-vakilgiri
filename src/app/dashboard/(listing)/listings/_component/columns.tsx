'use client';

import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
import { Project } from './ClientPageServer';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'date',
    header: '',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.date}</div>
      )
}
  },
  {
    accessorKey: 'paymentId',
    header: 'Name',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.paymentId}</div>
      )
}
  },
  {
    accessorKey: 'invoiceId',
    header: 'Registration',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.invoiceId}</div>
      )
}
  },
  {
    accessorKey: 'business',
    header: 'D.O.I',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.business}</div>
      )
}
  },
  {
    accessorKey: 'project',
    header: 'Industry',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.project}</div>
      )
}
  },
  {
    accessorKey: 'amount',
    header: 'Ask Price',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.amount}</div>
      )
}
  },
  {
    accessorKey: 'status',
    header: ()=>{
      return (
        <div className='text-center'>Manager</div>
      )
    },
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1 text-center'>
          <span
        className={`px-2 py-1 rounded-full text-white text-[13px] ${
          row.original.status === "Completed" ? "bg-[#007321] mr-1" : "bg-[#f21300]"
        }`}
      >
        {row.original.status}
      </span>
        </div>
      )
}
  },
  {
    accessorKey: 'amount',
    header: 'Status',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.amount}</div>
      )
}
  },
  {
    accessorKey: 'action',
    header: () => {
      return <div className="text-center">Action</div>;
    },
    cell: () => {
      return <ActionButton />;
    },
  },
];
