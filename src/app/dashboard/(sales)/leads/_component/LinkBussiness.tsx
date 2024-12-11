// import { Button } from '@/components/ui/button'
import AddNewBussinessDialog from '@/app/dashboard/business/_component/add-new-bussiness-dialog';
import Modal from '@/components/model/custom-modal';
import React, { useState } from 'react'

const LinkBussiness = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
  return (
    <div className='flex justify-center items-center flex-col p-0'>
        <span className="text-[14px] text-[#091747] font-semibold">
          Link Bussiness
        </span>
        <div className="flex flex-row gap-x-2">
             <button className='bg-[#f21300] hover:bg-[#f21300] px-3 py-2 text-[12px] text-white rounded-md'>Link Bussiness</button>
             <button className='hover:bg-[#f21300] bg-[#091747] px-3 py-2 text-[12px] text-white rounded-md' onClick={openModal}>Add Bussiness</button>
             <Modal isOpen={isModalOpen} onClose={closeModal} className='p-4'>
                <AddNewBussinessDialog onClose={closeModal}/>
             </Modal>
        </div>
    </div>
  )
}

export default LinkBussiness