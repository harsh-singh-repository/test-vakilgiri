'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<Client>[] = [
  // {
    // id: 'select',
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={table.getIsAllPageRowsSelected()}
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    // cell: ({ row }) => (
    //   <Checkbox
    //     checked={row.getIsSelected()}
    //     onCheckedChange={(value) => row.toggleSelected(!!value)}
    //     aria-label="Select row"
    //   />
    // ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  // {
  //   accessorKey: 'id',
  //   header: 'ID'
  // },
  {
    accessorKey: 'profile-image',
    header: ''
  },
  {
    accessorKey: 'id',
    header: 'Project ID'
  },
  {
    accessorKey: 'project',
    header: 'Project'
  },
  {
    accessorKey: 'bussiness',
    header: 'Bussiness'
  },
  {
    accessorKey: 'created',
    header: 'Created by'
  },
  {
    accessorKey: 'date',
    header: 'Due Date'
  },
  {
    accessorKey: 'progress',
    header: 'Progress'
  },
  {
    accessorKey: 'assigned',
    header: 'Assigned'
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
