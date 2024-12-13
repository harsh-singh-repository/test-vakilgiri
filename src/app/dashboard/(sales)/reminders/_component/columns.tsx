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
        <span>{`REMIND ${row.index}`}</span>
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
    header: 'Status'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({})=>{
      // const id = row.original.id;
        return(
          <ActionButton/>
        )
    }
  }
];
