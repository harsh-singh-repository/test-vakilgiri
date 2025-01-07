"use client"
import { IoMdMail } from "react-icons/io"
import { FaStackExchange } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { Button } from '@/components/ui/button'

// import { useRouter } from 'next/navigation'
// import { Dialog, DialogTrigger } from '@/components/ui/dialog'


const ActionButton = () => {
  

  console.log("open dialog iD");
  
  // const router = useRouter()

  // const handleEditClick = () => {
  //   console.log("id one",id)
  //   // console.log("id type4",typeof((id)))
  //   router.push(`/dashboard/client/${id}`)
  // }


  // console.log("Harsh",id);



  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        onClick={() => {}}
      >
        <IoMdMail />
      </Button>
        {/* <DialogTrigger asChild> */}
          <Button
            className="bg-[#042559] text-white w-6 h-7 text-sm">
            <FaStackExchange />
          </Button>
        {/* </DialogTrigger> */}
      <Button
        className="bg-[#042559] text-white w-6 h-7 text-sm"
        // onClick={handleEditClick}
      >
        <MdEdit />
      </Button>
    </div>
  )
}

export default ActionButton;

