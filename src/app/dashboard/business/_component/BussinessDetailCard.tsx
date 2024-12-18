import { useGetBussinessById } from '@/hooks/business/manage-business'
import React from 'react'

interface BussinessDetailCardProps{
    bussinessId:string | string[] | undefined
}

const BussinessDetailCard = ({bussinessId}:BussinessDetailCardProps) => {

    const {data} = useGetBussinessById(bussinessId);
  return (
      <div className="bg-[#ffffff] p-4 rounded-md">
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white">
           Business Details [BUZ27]
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
            <span className="font-semibold">{data?.businessName}</span>
            <div className="flex gap-x-1"><span className="font-bold">Mobile:</span><span className='font-medium'>{data?.businessMobile}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">Email:</span><span className='font-medium'>{data?.businessEmail}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">CIN:</span><span className='font-medium'>{data?.businessCin}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">DOI:</span><span className='font-medium'>{data?.businessRegDate}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">PAN:</span><span className='font-medium'>{data?.businessPan}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">GSTIN:</span><span className='font-medium'>{data?.businessGst}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">Address:</span><span className='font-medium'>{data?.businessAddress1}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">Auth Capital:</span><span className='font-medium'>{data?.authCapital}</span></div>
            <div className="flex gap-x-1"><span className="font-bold">Paidup Capital:</span><span className='font-medium'>{data?.paidUpCapital}</span></div>
            <div className="flex gap-x-2 font-bold">
                <div className="px-2 bg-[#A800F0] rounded-md">
                     <span className="text-[10px] text-white">{data?.businessType}</span>
                </div>
                <div className="px-2 bg-[#008827] rounded-md">
                     <span className="text-[10px] text-white">{data?.businessStatus}</span>
                </div>
            </div>
        </div>
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white mt-2">
           Contact Person
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
        <div className="flex gap-x-1"><span className="font-bold">Client:</span><span className='font-medium'>{data?.contactPerson?.firstName + " " + data?.contactPerson?.lastName}</span></div>
        <div className="flex gap-x-1"><span className="font-bold">Client:</span><span className='font-medium'>{data?.contactPerson?.mobile}</span></div>
        <div className="flex gap-x-1"><span className="font-bold">Email:</span><span className='font-medium'>{data?.contactPerson?.email}</span></div>
                <div className="px-2 bg-[#FFB200] rounded-md max-w-fit">
                     <span className="text-[10px] text-white font-bold">KYC:</span>
                </div>
        </div>
        <div className="bg-[#091747] p-2 text-xs rounded-md text-white mt-2">
           Creator Details
        </div>
        <div className="flex flex-col text-[#091747] text-xs mt-2 gap-y-1">
        <div className="flex gap-x-1"><span className="font-bold">Creator:</span><span className='font-medium'>{data?.creator?.firstName + " " + data?.creator?.lastName}</span></div>
            <span className="font-bold">Created On:</span>
            <span className="font-bold">Manager:</span>
        </div>
      </div>
  )
}

export default BussinessDetailCard;