'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/constants/data';
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Profile from "../../../../../../public/assets/profileimg.png";

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
    cell:()=>{
      return(
        <div>
          <Image
                alt="profile"
                src={Profile}
                height="35"
                width="35"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />
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
    header: 'Manager',
    cell:()=>{
      return(
         <div>
           <Image
                alt="profile"
                src={Profile}
                height="35"
                width="35"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />
         </div>
      )
    }
  },
  {
    accessorKey: 'kyc',
    header: 'KYC\'s',
    cell:()=>{
        return(
          <div className="mx-auto w-[7rem] flex items-center justify-center px-2 py-1 rounded-full bg-[#f21300] text-white text-sm">
    
         </div>
        )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
]