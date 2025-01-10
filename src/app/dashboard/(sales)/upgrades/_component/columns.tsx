'use client';

import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
import { Project } from './ClientPageServer';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.date}</div>
      )
}
  },
  {
    accessorKey: 'upgradeId',
    header: 'Upgrade ID',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.paymentId}</div>
      )
}
  },
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'particular',
    header: 'Particular',
  },
  {
    accessorKey: 'Quotation',
    header: 'quotation',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.amount}</div>
      )
}
  },
  {
    accessorKey: 'payments',
    header: 'Payments',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.amount}</div>
      )
}
  },
  {
    accessorKey:'assigned',
    header:'Assigned'
  },
  {
    accessorKey: 'status',
    header: ()=>{
      return (
        <div className='text-center'>Status</div>
      )
    },
    cell:()=>{
      return (
        <div></div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: () => {
      return <div className="text-right mr-4">Action</div>;
    },
    cell: () => {
      return <ActionButton />;
    },
  },
];
