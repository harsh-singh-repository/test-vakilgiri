import React from 'react'

const BussinessDetailCard = () => {
  return (
    <>
      <div className="bg-[#d5d5d5] p-4 rounded-md">
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white">
           Business Details [BUZ27]
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
            <span className="uppercase">VINEETA WELFARE FOUNDATION</span>
            <span className="font-bold">Mobile:</span>
            <span className="font-bold">Email:</span>
            <span className="font-bold">CIN:</span>
            <span className="font-bold">DOI:</span>
            <span className="font-bold">PAN:</span>
            <span className="font-bold">GSTIN:</span>
            <span className="font-bold">Address:</span>
            <span className="font-bold">Auth Capital:</span>
            <span className="font-bold">Paidup Capital: </span>
            <div className="flex gap-x-2 font-bold">
                <div className="px-2 bg-[#A800F0] rounded-md">
                     <span className="text-[10px] text-white">Section-8</span>
                </div>
                <div className="px-2 bg-[#008827] rounded-md">
                     <span className="text-[10px] text-white">Active</span>
                </div>
            </div>
        </div>
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white mt-2">
           Business Details [BUZ27]
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
            <span className="font-bold">Client:</span>
            <span className="font-bold">Mobile:</span>
            <span className="font-bold">Email:</span>
                <div className="px-2 bg-[#FFB200] rounded-md max-w-fit">
                     <span className="text-[10px] text-white font-bold">KYC:</span>
                </div>
        </div>
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white mt-2">
           Creator Details
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
            <span className="font-bold">Creator:</span>
            <span className="font-bold">Created On:</span>
            <span className="font-bold">Manager:</span>
        </div>
      </div>
    </>
  )
}

export default BussinessDetailCard;