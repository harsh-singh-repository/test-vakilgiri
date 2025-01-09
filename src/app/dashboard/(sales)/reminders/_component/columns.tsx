'use client';
import {Reminder } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';

export const columns: ColumnDef<Reminder>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell:({row})=>{
      return(
        <span>{`REMIND ${row.index+1}`}</span>
      )
    }
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell:({row})=>{
      return(
        <span>{row.original.dueDate.split('T')[0]}</span>
      )
    }
  },
  {
    accessorKey: 'reminderType',
    header: 'Mode',
    cell:({row})=>{
      return(
        <span>{row.original.reminderType}</span>
      )
    }
  },
  {
    accessorKey: 'subject',
    header: 'Title',
    cell:({row})=>{
      return(
        <span className='text-[#f21300] hover:text-[#091747]'>{row.original.subject}</span>
      )
    }
  },
  {
    accessorKey: 'body',
    header: 'Description',
    cell:({row})=>{
      return(
        <span>{row.original.body}</span>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status', 
    cell:({row})=>{
      return(
        <div 
          className={`flex items-center justify-center bg-yellow-400 rounded-full text-white text-[10px] w-fit h-fit px-2`}
        >
          {row.original.status}
        </div>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({row})=>{
      const { leadId, businessId, clientId, type: dialogType, id:reminderId } = row.original;

      const id = dialogType === 'lead' ? leadId 
                : dialogType === 'business' ? businessId 
                : clientId;
  
      return <ActionButton id={id} dialogType={dialogType} reminderId={reminderId}/>;
    }
  }
];
