'use client';
// import { Checkbox } from '@/components/ui/checkbox';
import { FileInterface} from '@/constants/data';
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef} from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { FaEye } from 'react-icons/fa';
;

// const fetchData = ()=>{
//   const {data,isFetching,isSuccess,error,isError} = useGetClients();
//    console.log(data);
//    console.log(typeof(data));
//    return data;
// }


export const fileColumns :  ColumnDef<FileInterface>[] = [
  {
    accessorKey: 'profile-image',
    header: ''
  },
  {
    accessorKey: 'updatedAt',
    header: 'Date',
    cell:({row})=>{
      const date = row.original.updatedAt
      return(
         <span>{date.split("T")[0]}</span>
      )
   }
  },
  {
    accessorKey: 'fileName',
    header: 'Document Title',
  },
  {
    accessorKey: 'Upload',
    header: 'Uploaded By',
    cell:({row})=>{
        const uploderName = row.original.creator.firstName + " " + row.original.creator.lastName;
        return(
            <span>{uploderName}</span>
        )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell:({})=>{
      return(<div className="flex flex-row gap-2">
          <FaEye className='h-8 w-8 bg-[#091747] p-2 rounded-md text-white cursor-pointer'/>
          <Trash2 className='h-8 w-8 bg-[#f21300] p-2 rounded-md text-white cursor-pointer' strokeWidth={"3"}/>
      </div>)
    }
  }
];
 