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
    header: 'Retailer ID',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{`RET${row.index}`}</div>
      )
}
  },
  {
    accessorKey: 'invoiceId',
    header: 'Retailer',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.invoiceId}</div>
      )
}
  },
  {
    accessorKey: 'business',
    header: 'PAN',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.business}</div>
      )
}
  },
  {
    accessorKey: 'project',
    header: 'Clients',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.project}</div>
      )
}
  },
  {
    accessorKey: 'amount',
    header: 'Projects',
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
        <div className='text-center'>Wallet</div>
      )
    },
    cell:()=>{
      return (
        <div className='text-center'>34</div>
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
