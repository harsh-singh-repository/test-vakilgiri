import React, { useEffect, useState } from 'react'
import { Services } from '../types';
import { getSession } from 'next-auth/react';

interface QuotationProps {
    data: Services;
  }
  interface StateWiseFee {
    [authorizedCapital: string]: {
      id: string;
      amount: number;
      authorizedCapital: number;
      serviceId: string;
      state: string;
      creatorId: string;
      createdAt: string;
      modifiedAt: string;
      slug: string;
    }[];
  }
const ServiceFee: React.FC<QuotationProps> = ({ data }) => {
    const [stateWiseFees, setStateWiseFees] = useState<StateWiseFee | null>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    // const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [fetchagain,setFetchagain]=useState(false);
    useEffect(() => {
      const fetchStateWiseFees = async () => {
        const session = await getSession();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/state-wise-fee/${data.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
        const result = await response.json();
        setStateWiseFees(result.data);
      };
      setFetchagain(false);
      fetchStateWiseFees();
    }, [data.id, fetchagain]);
    const handleInputChange = async (id: string, value: string) => {
      // setInputValues((prev) => ({ ...prev, [id]: value }));
  
      // Debounced PUT request
      const session = await getSession();
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/state-wise-fee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ amount: Number(value) }),
      });
    };
    const handleFetch = async () => {
      setFetchagain(true);
      const session = await getSession();
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/state-wise-fee/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
    };
    
    const handleDeleteAll = async () => {
      if (!stateWiseFees) return;
      const allIds = Object.values(stateWiseFees)
        .flat()
        .map((state) => state.id);
  
      const session = await getSession();
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/state-wise-fee/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ ids: allIds }), 
      });
  
      setStateWiseFees(null);
    };
  
    return (
      <div>
        <div className="flex gap-2 w-full">
          <p className="text-blue-950 font-bold font-poppins text-xl">State Wise Fees</p>
          <div
            className="bg-green-700 h-4 w-16 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer"
            onClick={handleFetch}
          >
            Create
          </div>
          {
            Object.entries(stateWiseFees || {}).length>0 && (
              <div className="bg-red-500 h-4 w-20 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer"
              onClick={handleDeleteAll}
              >
                Delete All
              </div>
            )
          }
      
        </div>
        {
          Object.entries(stateWiseFees || {}).length>0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl-grid-cols-2 2xl:grid-cols-4 gap-2 mt-2">
            {Object.entries(stateWiseFees || {}).map(([capital, states]) => (
             <div
             key={capital}
             className="border rounded-xl shadow-md bg-white w-full max-w-md overflow-hidden"
           >
             <div className="">
               <table className="w-full text-sm">
                 <thead className="bg-blue-950 text-white">
                   <tr>
                     <th className="px-3 py-2 text-left font-semibold">
                       Upto {Number(capital) / 100000} Lakh
                     </th>
                     <th className="px-3 py-2 text-left font-semibold">Amount</th>
                   </tr>
                 </thead>
                 <tbody>
                   {states.map((state) => (
                     <tr key={state.id} className="border-t">
                       <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                         {state.state.replace("_", " ")}
                       </td>
                       <td className="px-3 py-2">
                         <input
                           type="number"
                           placeholder={activeInput === state.id ? "0.00" : "Amount"}
                           onFocus={() => setActiveInput(state.id)}
                           onBlur={() => setActiveInput(null)}
                           onChange={(e) => handleInputChange(state.id, e.target.value)}
                           className="w-full px-2 py-1 border rounded text-gray-700 min-w-[100px]"
                         />
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
           
            ))}
          </div>
          ):(
            <table className="table-fixed w-full mt-2">
    <tbody>
      <tr>
        <td>
          <div className="w-full bg-gray-200 h-2 rounded-full"></div>
        </td>
        <td>
          <div className="w-full bg-gray-200 h-2 rounded-full"></div>
        </td>
        <td>
          <div className="w-full bg-gray-200 h-2 rounded-full"></div>
        </td>
        <td>
          <div className="w-full bg-gray-200 h-2 rounded-full"></div>
        </td>
      </tr>
    </tbody>
  </table>
  
          
          )
        }
        
      </div>
    );
}

export default ServiceFee
