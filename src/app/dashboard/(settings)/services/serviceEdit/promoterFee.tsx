import React, { useEffect, useState } from "react";
import { Services } from "../types";
import { getSession } from "next-auth/react";

interface QuotationProps {
  data: Services;
}

interface PromoterWiseFee {
  [promoterCount: string]: {
    id: string;
    amount: number;
    promoter_count: string;
    serviceId: string;
    promoterItems: string;
    creatorId: string;
    createdAt: string;
    modifiedAt: string;
    slug: string;
  }[];
}

const PromoterFee: React.FC<QuotationProps> = ({ data }) => {
  const [promoterWiseFees, setPromoterWiseFees] = useState<PromoterWiseFee | null>(null);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  // const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [fetchagain, setFetchagain] = useState(false);

  useEffect(() => {
    const fetchPromoterWiseFees = async () => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/promoter-wise-fee/${data.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      const result = await response.json();
      setPromoterWiseFees(result.data);
    };
    setFetchagain(false);
    fetchPromoterWiseFees();
  }, [data.id, fetchagain]);

  const handleInputChange = async (id: string, value: string) => {
    // setInputValues((prev) => ({ ...prev, [id]: value }));

    // Debounced PUT request
    const session = await getSession();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/promoter-wise-fee/${id}`, {
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
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/promoter-wise-fee/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
  };

  const handleDeleteAll = async () => {
    if (!promoterWiseFees) return;
    const allIds = Object.values(promoterWiseFees)
      .flat()
      .map((promoter) => promoter.id);

    const session = await getSession();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/promoter-wise-fee/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({ ids: allIds }),
    });

    setPromoterWiseFees(null);
  };

  return (
    <div className="mt-1">
      <div className="flex gap-2 w-full">
        <p className="text-[#091747] font-bold font-poppins text-[17px]">Promoter Wise Fees</p>
        <div
          className="bg-[#007822] h-4 w-16 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer"
          onClick={handleFetch}
        >
          Create
        </div>
        {Object.entries(promoterWiseFees || {}).length > 0 && (
          <div
            className="bg-[#f21300] h-4 w-20 flex justify-center items-center mt-1 rounded-full text-white text-xs cursor-pointer"
            onClick={handleDeleteAll}
          >
            Delete All
          </div>
        )}
      </div>
      {Object.entries(promoterWiseFees || {}).length > 0 ? (
        <div className="flex gap-2 mt-2 w-[500px] overflow-x-auto">
          {Object.entries(promoterWiseFees || {}).map(([promoterCount, promoters]) => (
            <div
              key={promoterCount}
              className="border rounded-xl shadow-md bg-white w-80 overflow-hidden"
            >
              <table className="w-fit text-sm">
                <thead className="bg-blue-950 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">
                      {promoterCount.replace("_", " ")}
                    </th>
                    <th className="px-3 py-2 text-left font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {promoters.map((promoter) => (
                    <tr key={promoter.id} className="border-t">
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                        {promoter.promoter_count.replace("_"," ")}
                      </td>
                      <td className="px-3 py-2 w-56">
                        <input
                          type="number"
                          placeholder={activeInput === promoter.id ? "0.00" : "Amount"}
                          onFocus={() => setActiveInput(promoter.id)}
                          onBlur={() => setActiveInput(null)}
                          onChange={(e) => handleInputChange(promoter.id, e.target.value)}
                          className="w-[80px] text-xs px-2 py-1 border rounded text-gray-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default PromoterFee;
