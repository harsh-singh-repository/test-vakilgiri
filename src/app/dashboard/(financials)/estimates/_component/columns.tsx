'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
import { EstimateProps } from '@/types';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<EstimateProps>[] = [
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
    accessorKey: 'estimateId',
    header: 'Estimate ID',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.estimateId}</div>
      )
}
  },
  {
    accessorKey: 'business',
    header: 'Business',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.business}</div>
      )
}
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.state}</div>
      )
}
  },
  {
    accessorKey: 'quotations',
    header: 'Quotations',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.quotations}</div>
      )
}
  },
  {
    accessorKey: 'payment',
    header: 'Payments',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.payments}</div>
      )
}
  },
  {
    accessorKey: 'dueAmount',
    header: 'Due Amount',
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.dueAmount}</div>
      )
}
  },
  {
    accessorKey: 'status',
    header: ()=>{
      return (
        <div className='text-center'>Status</div>
      )
    },
    cell:({row})=>{
      return (
        <div className='text-[14px] text-blue-950 font-medium ml-1 text-center'>
        <span
      className={`px-2 py-1 rounded-full text-white text-[13px] ${
        row.original.status === "Completed" ? "bg-[#007321] mr-1" : "bg-[#FFB200]"
      }`}
    >
      {row.original.status}
    </span>
      </div>
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
