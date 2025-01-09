'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GetTransactionType} from './ClientPageServer';



export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPm = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format the final string
  return `${day}-${month}-${year}, ${hours}:${minutes} ${amPm}`;
}

export const columns: ColumnDef<GetTransactionType>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell:({row})=>{
      return (
        <div className='text-[13px] text-blue-950 font-medium ml-1'>{formatDateTime(row.original.createdAt)}</div>
      )
}
  },
  {
    accessorKey: 'dr/cr',
    header: 'Dr/Cr',
    cell:({row})=>{
      const {transactionType} = row.original

      if(transactionType === "CREDIT")
      return (
        <div className='text-[13px] text-blue-950 font-medium ml-1'>Cr</div>
      )
      if(transactionType === "DEBIT")
      return (
        <div className='text-[13px] text-blue-950 font-medium ml-1'>Dr</div>
      )
}
  },
  {
    accessorKey: 'txnId',
    header: 'Txn ID',
    cell:({})=>{
      // return (
      //   <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.}</div>
      // )
}
  },
  {
    accessorKey: 'referenshId',
    header: 'Reference ID',
    cell:({row})=>{
      return (
        <div className='text-[13px] text-blue-950 font-medium ml-1'>{row.original.referenceId}</div>
      )
}
  },
  {
    accessorKey: 'particular',
    header: 'Particular',
    cell:({})=>{
      // return (
      //   // <div className='text-[14px] text-blue-950 font-medium ml-1'>{row.original.project}</div>
      // )
}
  },
  {
    accessorKey: 'deposit',
    header: 'Deposit',
    cell:({row})=>{
      return (
        <div className='text-[13px] text-[#007321] font-medium ml-1'>+{row.original.amount}</div>
      )
}
  },
  {
    accessorKey: 'withdrawal',
    header: 'Withdrawral',
    cell:({row})=>{
      return (
        <div className='text-[13px] text-[#f21300] font-medium ml-1'>-{row.original.amount}</div>
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
        <div className='text-[13px] text-blue-950 font-medium ml-1 text-center'>
          <span
        className={`w-fit h-fit rounded-full text-white text-[10px] px-2 ${
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
    accessorKey: 'action',
    header: () => {
      return <div className="text-center">Action</div>;
    },
    cell: () => {
      return (
        <span className='text-[#f21300] text-3xl cursor-pointer'>...</span>
      )
    },
  },
];
