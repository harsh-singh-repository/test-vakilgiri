'use client';
import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: ''
  },
  {
    accessorKey: 'date',
    header: 'Due Date'
  },
  {
    accessorKey: 'service',
    header: 'Service'
  },
  {
    accessorKey: 'mode',
    header: 'Mode'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'action',
    header: 'Action',
  }
];
