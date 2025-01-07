'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Business } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
import Profile from "../../../../../../public/assets/profileimg.png";
import Image from 'next/image';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<Business>[] = [
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
    accessorKey: 'businessName',
    header: 'Name',
    cell:({row})=>{
        
      return(
         <span className=''>{row.original.businessName}</span>
      )
    }
  },
  {
    accessorKey: 'businessType',
    header: 'Registration',
    cell:({row})=>{
        
      return(
        <div className="text-[10px] bg-[#A301D5] px-1 text-white w-fit rounded-sm">
            <span>{row.original.businessType?.replace("_"," ")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'businessRegDate',
    header: 'D.O.I',
    cell:({row})=>{
      return(
          <span>{row.original.businessRegDate.split("T")[0]}</span>
      )
    }
  },
  {
    accessorKey: 'estimates',
    header: 'Estimates',
    cell:({row})=>{
      return(
          <span>{row.original.estimate.length}</span>
      )
    }
  },
  {
    accessorKey: 'projects',
    header: 'Projects',
    cell:({row})=>{
      return(
          <span>{row.original.projects.length}</span>
      )
    }
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
    accessorKey: 'businessStatus',
    header: 'Status'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({row})=>{
       const id = row.original.id
       return(
         <div className="flex justify-center items-center">
             <ActionButton id={id}/>
         </div>
       )
    }
  }
];
