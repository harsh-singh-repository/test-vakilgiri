"use client";
import { StarToggle } from "@/components/star-toggle";
// import { Checkbox } from '@/components/ui/checkbox';
import { businessUsers } from "@/constants/data";
import {
  useAssignContactPerson,
  useGetBussinessById,
} from "@/hooks/business/manage-business";
import { useQueryClient } from "@tanstack/react-query";
// import { useGetClients } from '@/hooks/users/manage-client';
import { ColumnDef, Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ActionButton from "./Action";

// const fetchData = ()=>{
//   const {data,isFetching,isSuccess,error,isError} = useGetClients();
//    console.log(data);
//    console.log(typeof(data));
//    return data;
// }

interface NameCellProps {
  row: Row<businessUsers>; // Specify the type of data your row represents
  businessId: string | string[] | undefined;
}

const NameCell: React.FC<NameCellProps> = ({ row, businessId }) => {
  const { data } = useGetBussinessById(businessId);
  const queryClient = useQueryClient();

  const name = `${row.original.firstName} ${row.original.lastName}`;
  const [filling, setFilling] = useState<boolean>(false);

  // Set initial state when data is loaded
  useEffect(() => {
    setFilling(data?.contactPersonId === row.original.id);
  }, [data, row.original.id]);

  // Custom hooks
  const { mutate } = useAssignContactPerson(businessId);

  // Handle assigning a contact person
  const handleAssign = (newFilling: boolean) => {
    mutate(
      { contactPersonId: row.original.id },
      {
        onSuccess: () => {
          toast.success("Business User Assigned");
          queryClient.invalidateQueries({ queryKey: ["businessId"] });
          setFilling(newFilling);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const errorMessage =
              error.response?.data?.message || "An unexpected error occurred.";
            toast.error(`Failed to Assign Business User: ${errorMessage}`);
          } else {
            toast.error("An unexpected error occurred.");
          }
        },
      }
    );
  };

  // Render
  return (
    <div className="flex flex-row gap-x-2 justify-center items-center">
      <StarToggle filled={filling} onChange={handleAssign} />
      <span>{name}</span>
    </div>
  );
};

export const columns = (
  businessId: string | string[] | undefined
): ColumnDef<businessUsers>[] => [
  {
    accessorKey: "profile-image",
    header: "Profile",
  },
  {
    accessorKey: "DIN",
    header: "DIN",
    cell: ({ row }) => {
      const count = row.index + 1;
      return <span>USR{count}</span>;
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }: { row: Row<businessUsers> }) => (
      <NameCell row={row} businessId={businessId} />
    ),
  },
  {
    accessorKey: "pan",
    header: "PAN",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "status",
    header: "KYC",
    cell: ({ row }) => {
      const kycStatus = row.original.kycStatus;
      return (
        <div className="bg-[#f21300] max-h-fit text-[10px] text-white rounded-md">
          {kycStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <ActionButton id={row.original.id} />;
    },
  },
];
