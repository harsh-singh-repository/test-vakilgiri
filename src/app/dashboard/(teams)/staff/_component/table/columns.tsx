'use client';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Client } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import ActionButton from './actions';
import { StaffType } from '../../_types/types';
// import { CellAction } from './cell-action';


export const columns: ColumnDef<StaffType>[] = [
  {
    accessorKey: 'profile-image',
    header: '',
  },
  {
    accessorKey: 'id',
    header: 'Staff ID',
    cell:({row})=>{
      const index = row.index+1;
       return(
         <div>
           <span>{`STAFF ${index}`}</span>
         </div>
       )
    }
  },
  {
    accessorKey: 'project',
    header: 'Name',
    cell:({row})=>{
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return(
        <div>
           <span>{firstName + " " + lastName}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'bussiness',
    header: 'Role',
    cell:({row})=>{
      const role = row.original.userRoles
      return(
        <div>
          <span>{role.replace("_"," ")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile'
  },
  {
    accessorKey: 'date',
    header: 'Due Date'
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell:()=>{
       return(
        <div className="bg-slate-200 w-full h-1 justify rounded-md">
             <div className="bg-red-600 w-[20%] rounded-md h-1"></div>
         </div>
       )
    }
  },
  {
    accessorKey: 'assigned',
    header: 'Assigned'
  },
  {
    accessorKey: 'login',
    header: 'Status',
    cell:({row})=>{
      const status = row.original.loginStatus;
       if(status === "Active"){
        return (
          <div className='bg-[#008626] text-white rounded-full w-fit px-2'>
            <span className='text-[10px]'>{status}</span>
          </div>
        )
       }
       if(status === "Inactive"){
        return (
          <div className='bg-[#002537] text-white rounded-full w-fit px-2'>
            <span className='text-[10px]'>{status}</span>
          </div>
        )
       }
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({row})=>{
      const id = row.original.id
      return(
         <ActionButton openDialogId={id}/>
      )
    }
  }
];
