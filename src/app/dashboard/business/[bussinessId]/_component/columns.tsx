'use client';
import { StarToggle } from '@/components/star-toggle';
// import { Checkbox } from '@/components/ui/checkbox';
import { businessUsers} from '@/constants/data';
import { useAssignContactPerson } from '@/hooks/business/manage-business';
import { useQueryClient } from '@tanstack/react-query';
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

// const fetchData = ()=>{
//   const {data,isFetching,isSuccess,error,isError} = useGetClients();
//    console.log(data);
//    console.log(typeof(data));
//    return data;
// }

interface NameCellProps {
    row: Row<businessUsers>; // Specify the type of data your row represents
    businessId: string | string [] | undefined;
  }

  const NameCell: React.FC<NameCellProps> = ({ row, businessId }) => {
    const queryClient = useQueryClient();
    const name = `${row.original.firstName} ${row.original.lastName}`;
    const { mutate } = useAssignContactPerson(businessId);
  
    const handleAssign = () => {
        mutate({ contactPersonId: row.original.id },{
            onSuccess:()=>{
                toast.success("Bussiness User Assigned");
                queryClient.invalidateQueries({queryKey:["bussinessId"]})
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                  // Safely access the response data
                  const errorMessage =
                    error.response?.data?.message || "An unexpected error occurred.";
                  // console.log("Axios Error Message:", errorMessage);
        
                  // Display error message in toast
                  toast.error(`Failed to Assign Bussiness User: ${errorMessage}`);
                } else {
                  // Handle non-Axios errors
                  toast.error("An unexpected error occurred.");
                }
              }, 
        });
    };
  
    return (
      <div className="flex flex-row gap-x-2 justify-center items-center">
        <StarToggle onChange={handleAssign}/>
        <span>{name}</span>
      </div>
    );
  };

export const columns =  (businessId: string | string [] | undefined):  ColumnDef<businessUsers>[] => [
  {
    accessorKey: 'profile-image',
    header: 'Profile'
  },
  {
    accessorKey: 'DIN',
    header: 'DIN',
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
    cell: ({ row }: { row: Row<businessUsers> }) => (
        <NameCell row={row} businessId={businessId} />
    ),
  },
  {
    accessorKey: 'pan',
    header: 'PAN'
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile'
  },
  {
    accessorKey: 'status',
    header: 'KYC',
    cell:({row})=>{
        const kycStatus = row.original.kycStatus;
        return(
          <div className='bg-[#f21300] max-h-fit text-[10px] text-white rounded-md'>
             {kycStatus}
          </div>
        )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
  }
];
