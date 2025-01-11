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
    header: 'Reg. Date',
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
    header: 'Project ID',
    cell:({row})=>{
      const count = row.index + 1;
      return(
         <span className='text-[#f21300]'>P{count}</span>
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
    header: 'GSTIN'
  },
  {
    accessorKey: 'bussinesses',
    header: 'State',
    cell:({row})=>{
       const bussiness = row.original.businessesAsMember.length;
      return(
      <span>{bussiness}</span>
    )
  }},
  {
    accessorKey: 'projects',
    header: 'Scheme',
    cell:({row})=>{
      const project = row.original.createdProjects.length
    return(
       <span>{project}</span>
    )
  }
  },
  {
    accessorKey: 'walletAmount',
    header: 'Period'
  },
  {
    accessorKey: 'manager',
    header: 'Assigned',
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
    header: 'Status',
    cell:()=>{
        return(
          <div className="mx-auto  flex items-center justify-center px-2 rounded-full bg-[#00A02E] text-white text-[10px] w-fit">
            Active
         </div>
        )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
]