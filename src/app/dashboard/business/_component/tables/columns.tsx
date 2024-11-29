'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { Business } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: 'profile-image',
    header: 'Profile',
  },
  {
    accessorKey: 'businessName',
    header: 'Name',
    cell:({row})=>{
        
      return(
         <span className='uppercase'>{row.original.businessName}</span>
      )
    }
  },
  {
    accessorKey: 'businessType',
    header: 'Registration',
    cell:({row})=>{
        
      return(
        <div className="text-[10px] bg-[#A301D5] px-1 text-white w-fit rounded-md">
            <span>{row.original.businessType}</span>
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
