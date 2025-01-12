"use client"

import { FaEye, FaPencilAlt,} from "react-icons/fa"
import { Button } from '@/components/ui/button'



const ActionButton = () => {


  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]"
        onClick={() => {}}
      >
        <FaPencilAlt/>
      </Button>

          <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm hover:bg-[#f21300]">
           <FaEye/>
          </Button>

    </div>
  )
}

export default ActionButton;
