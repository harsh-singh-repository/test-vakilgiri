'use client';
import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'leadId',
    header: 'Lead ID'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'service',
    header: 'Service'
  },
  {
    accessorKey: 'businessOrClient',
    header: 'Business/Client'
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name'
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
  }
];
