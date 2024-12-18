import React from 'react'

interface TicketCreator{
    firstName:string;
    lastName:string;
    email:string;
    mobileNumber:string;
    pan:string;
    address1:string;
    address2:string;
    alternateMobileNumber:string;
  }
  interface TicketCreatorProps{
    data:TicketCreator
  }
const ShowCreator:React.FC<TicketCreatorProps>=({data})=> {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-xl text-[#091747] font-semibold'>{`${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`}</div>
      <div className='flex flex-col gap-1'>
        <div className='text-[#091747] text-sm font-medium'><strong>Pan :</strong>{` ${data.pan}`}</div>
        <div className='text-[#091747] text-sm font-medium'><strong>Aadhar :</strong>{` ${data.pan}`}</div>
        <div className='text-[#091747] text-sm font-medium'><strong>Mobile :</strong>{` ${data.mobileNumber}`}</div>
        <div className='text-[#091747] text-sm font-medium'><strong>Email :</strong>{` ${data.email}`}</div>
        <div className='text-[#091747] text-sm font-medium'><strong>Address :</strong>{` ${data.address1}`}</div>
      </div>
    </div>
  )
}

export default ShowCreator
