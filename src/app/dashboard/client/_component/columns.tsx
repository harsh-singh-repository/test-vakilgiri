'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

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
    header: 'Profile'
  },
  {
    accessorKey: 'cltid',
    header: 'CLT ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'pan',
    header: 'PAN'
  },
  {
    accessorKey: 'bussinesses',
    header: 'Businesses'
  },
  {
    accessorKey: 'projects',
    header: 'Projects'
  },
  {
    accessorKey: 'wallet',
    header: 'Wallet'
  },
  {
    accessorKey: 'manager',
    header: 'Manager'
  },
  {
    accessorKey: 'kyc',
    header: 'KYC\'s'
  },
  {
    accessorKey: 'action',
    header: 'Action',
  }
];
