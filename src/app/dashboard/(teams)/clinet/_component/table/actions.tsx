import { Button } from '@/components/ui/button';
import React, {} from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const ActionButton = ({openDialogId}:{openDialogId:string}) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]" onClick={()=>router.push(`/dashboard/staff/${openDialogId}`)}>
        <FaPencilAlt/>
      </Button>
      <Button className="bg-[#f21300] text-white w-6 h-7 text-sm">
        <RiDeleteBin6Line />
      </Button>
    </div>
  );
};

export default ActionButton;

