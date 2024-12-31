'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/constants/data';
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

// const fetchData = ()=>{
//   const {data,isFetching,isSuccess,error,isError} = useGetClients();
//    console.log(data);
//    console.log(typeof(data));
//    return data;
// }

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'profile-image',
    header: 'Profile',
    cell:({row})=>{
      const imagesrc = row.original.businessLogo;
      return(
        <div>
           <Image width={20} height={20} alt="logo" src={imagesrc}/>
        </div>
      )
    }
  },
  {
    accessorKey: 'usrId',
    header: 'CLT ID',
    cell:({row})=>{
      const count = row.index + 1;
      return(
         <span>USR{count}</span>
      )
   }
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell:({row})=>{
      const name = row.original.firstName + " " + row.original.lastName;
      return(
         <span>{name}</span>
      )
   }
  },
  {
    accessorKey: 'pan',
    header: 'PAN'
  },
  {
    accessorKey: 'bussinesses',
    header: 'Businesses',
    cell:({row})=>{
       const bussiness = row.original.businessesAsMember.length;
      return(
      <span>{bussiness}</span>
    )
  }},
  {
    accessorKey: 'projects',
    header: 'Projects',
    cell:({row})=>{
      const project = row.original.createdProjects.length
    return(
       <span>{project}</span>
    )
  }
  },
  {
    accessorKey: 'walletAmount',
    header: 'Wallet'
  },
  {
    accessorKey: 'manager',
    header: 'Manager'
  },
  {
    accessorKey: 'kyc',
    header: 'KYC\'s',
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
]