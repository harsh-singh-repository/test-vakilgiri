'use client';
import { Client } from '@/constants/data';
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef } from '@tanstack/react-table';

// const fetchData = ()=>{
//   const {data,isFetching,isSuccess,error,isError} = useGetClients();
//    console.log(data);
//    console.log(typeof(data));
//    return data;
// }

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'profile-image',
    header: 'Profile'
  },
  {
    accessorKey: 'ticketId',
    header: 'Ticket ID',
    cell:({row})=>{
      const count = row.index + 1;
      return(
         <span>TKT{count}</span>
      )
   }
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'creator',
    header: 'Creator',
    cell:({row})=>{
      const name = row.original.firstName + " " + row.original.lastName;
      return(
         <span>{name}</span>
      )
   }
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'subject',
    header: 'Subject'
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
