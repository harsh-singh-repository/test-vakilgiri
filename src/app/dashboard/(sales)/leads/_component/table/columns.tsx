'use client';
import { Leads } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';

export const columns: ColumnDef<Leads>[] = [
  {
    accessorKey: 'ledId',
    header: 'Lead ID',
    cell:({row})=>{
       const count = row.index + 1;
       return(
          <span>LED{count}</span>
       )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell:({row})=>{
      return(
        <span>{row.original.createdAt.split('T')[0]}</span>
      )
    }
    },
  {
    accessorKey:'service',
    header: 'Service',
    cell:({row})=>{
      return(
        <span>{row.original.service?.replace(/_/g, ' ')}</span>
      )
    }
  },
  {
    accessorKey: 'firstName',
    header: 'Business/Client',
    cell:({row})=>{
      return(
        <span className='text-[#F21300]'>{row.original.firstName + " " + row.original.lastName}</span>
      )
    }
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile'
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'assigned',
    header: 'Assigned'
  },
  {
    accessorKey: 'convertedOn',
    header: 'Converted On'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({row})=>{
      const id = row.original.id;
       return(
        <ActionButton id={id}/>
       )
    }
  }
];
