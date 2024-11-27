'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Business } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<Business>[] = [
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
    header: 'Profile'
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'registration',  
    header: 'Registration'
  },
  {
    accessorKey: 'doi',
    header: 'D.O.I'
  },
  {
    accessorKey: 'estimates',
    header: 'Estimates'
  },
  {
    accessorKey: 'projects',
    header: 'Projects'
  },
  {
    accessorKey: 'manager',
    header: 'Manager'
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
