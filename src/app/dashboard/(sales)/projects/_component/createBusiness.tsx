"use client"
import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import HasPan from './hasPan'
import NotPan from './notPan'

interface createBusinessProps{
    close:()=>void
}
const CreateBusiness:React.FC<createBusinessProps> = ({close}) => {
     const [hasPan, setHasPan] = useState<boolean>(true);
  

  return (
    <div className='min-w-96 p-4'>
      <div className='flex justify-between items-center'>
        <div>
        <label className='text-[#091747] text-[16px] font-semibold'>Create Business</label>
        </div>
            <div className="text-[#f21300] cursor-pointer" onClick={close}>
                <ImCross size={14} />
              </div>
      </div>
      <div className="flex items-center justify-between mr-4 mt-2">
      {/* Option 1: Do have PAN */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setHasPan(true)}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            hasPan ? "border-red-500" : "border-gray-400"
          } flex items-center justify-center`}
        >
          {hasPan && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
        </div>
        <span className="text-[14px]">Do have PAN</span>
      </div>

      {/* Option 2: Doesn't have PAN */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setHasPan(false)}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            !hasPan ? "border-red-500" : "border-gray-400"
          } flex items-center justify-center`}
        >
          {!hasPan && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
        </div>
        <span className="text-[14px]">Does not have PAN</span>
      </div>
    </div>
    
    <div className='mt-2'>
        {
            hasPan? (
                <HasPan/>
            ):(
                <NotPan/>
            )
        }
    </div>
   
    </div>
  )
}

export default CreateBusiness
