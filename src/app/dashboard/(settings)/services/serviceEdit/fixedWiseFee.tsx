import React, { useEffect, useState } from 'react';
import { Services } from '../types';
import FixedWiseForm from './fixedWiseForm';
import { FormModal } from '../_components/formModal';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { RiDeleteBin5Line } from "react-icons/ri";

interface FixedWiseProps {
  data: Services;
}

interface FixedGovtWise {
  id: string;
  amount: number;
  title: string;
  description: string;
  fixedType: string;
}

const FixedWiseFee: React.FC<FixedWiseProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fixedwise, setFixedwise] = useState<FixedGovtWise[]>([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchServices = async () => {
      const session = await getSession();
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/fixed-wise-fee/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setFixedwise(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching fixed wise:', error);
      }
    };
    fetchServices();
  }, [data.id]);
  const handleAmountChange = async (id: string, newAmount: number) => {
    console.log(newAmount)
    const session = await getSession();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/fixed-wise-fee/${id}`,
        { amount: newAmount },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      setFixedwise((prev) =>
        prev.map((item) => (item.id === id ? { ...item, amount: newAmount } : item))
      );
    } catch (error) {
      console.error('Error updating amount:', error);
    }
  };
  const handleDelete = async (id: string) => {
    const session = await getSession();
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/fixed-wise-fee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setFixedwise((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting fixed-wise item:', error);
    }
  };
  return (
    <div>
      <div className="flex gap-2 w-full">
        <p className="text-[#091747] font-bold font-poppins text-[17px]">Fixed Govt Fees</p>
        <div
          className="bg-[#007822] h-4 w-16 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer"
          onClick={handleOpenModal}
        >
          Create
        </div>
        <div className="bg-[#f21300] h-4 w-20 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer">
          Delete All
        </div>
      </div>
      <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FixedWiseForm data={data} />
      </FormModal>

      <div className="mt-4">
        {fixedwise.length === 0 ? (
          <table className="table-fixed w-full mt-2 ">
            <tbody>
              <tr>
                <td>
                  <div className="w-full bg-gray-200 h-2 rounded-full"></div>
                </td>
                <td>
                  <div className="w-full bg-gray-200 h-2 rounded-full"></div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className='rounded-xl w-fit overflow-hidden'>
          <table className="table-auto w-96 rounded-xl border shadow-md">
            <thead className='rounded-xl'>
              <tr className=" rounded-xl bg-blue-950">
                <th className="px-4 py-2 text-left text-white">Particular</th>
                <th className="px-4 py-2 text-white">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fixedwise.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">
                    <div className='flex gap-2 font-medium text-[14px]'>
                    <div className='text-[#f21300] font-poppins'>
                     {index + 1}
                    </div>
                    <div className='text-[#f21300] font-poppins'>
                       {item.title}
                    </div>
                    </div>
                   
                    <div className='text-[11px] font-poppins'>
                       {item.description}
                    </div>
                    <div className='flex gap-2 font-poppins text-[12px]'>
                      <strong className='font-poppins text-[12px]'>{`Type : `}</strong>{item.fixedType}
                    </div>
                  </td>
                  <td className=" px-4 py-2 text-right">
                    <div className='flex gap-2 items-center justify-end'>
                    <Input
                      defaultValue={item.amount}
                      type="number"
                      onBlur={(e) => handleAmountChange(item.id, Number(e.target.value))}
                      className='w-[100px]'
                    />
                    <div className='text-red-500 cursor-pointer' onClick={()=>handleDelete(item.id)}>
                    <RiDeleteBin5Line />
                    </div>
                    </div>
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedWiseFee;
