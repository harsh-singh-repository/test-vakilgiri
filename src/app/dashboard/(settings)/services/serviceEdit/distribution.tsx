import React, { useEffect, useState } from 'react';
import { Services } from '../types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';

interface DistributionProps {
  data: Services;
}

interface DistributionData {
  id: string;
  type: string | null;
  staff: number | null;
  professional: number | null;
  retailer: number | null;
  mediator: number | null;
}

const Distribution: React.FC<DistributionProps> = ({ data }) => {
  const [distributionData, setDistributionData] = useState<DistributionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      try {
        const response = await axios.get(
          `https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/distribution/service/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
        setDistributionData(response.data.data[0]);
        console.log(response);
      } catch (error) {
        console.error('Error fetching distribution data', error);
      }
    };

    fetchData();
  }, [data.id]);

  const handleChange = (field: keyof DistributionData, value: string | number | null) => {
    setDistributionData((prev) =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  const handleBlur = async (field: keyof DistributionData, value: string | number | null) => {
    const session = await getSession();
    console.log('Blur triggered', field, value);

    try {
      console.log(1)
      const response=await axios.patch(
        `https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/distribution/${distributionData?.id}`,
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      console.log(response)
    } catch (error) {
      console.error(`Error updating field ${field}`, error);
    }
  };

  if (!distributionData) return <div></div>;

  return (
    <div className="p-1 ml-2 flex flex-col shadow-lg rounded-xl">
      <h1 className="text-lg font-semibold mb-2">Distributions</h1>
      <div className="grid grid-cols-8 w-full bg-blue-950 text-white">
        {/* Header Row */}
        <div className="col-span-3 font-medium px-4 py-2">Service</div>
        <div className="font-medium px-4 py-2">Type</div>
        <div className="font-medium px-4 py-2">Staff</div>
        <div className="font-medium px-4 py-2">Professional</div>
        <div className="font-medium px-4 py-2">Mediator</div>
        <div className="font-medium px-4 py-2">Retailer</div>
      </div>
      <div className="grid grid-cols-8 gap-px">
        {/* Data Row */}
        <div className="col-span-3 border px-4 py-2">{data.ServiceName}</div>
        <div className="border px-4 py-2">
          <select
            className="w-full border-none bg-transparent focus:outline-none"
            value={distributionData.type ?? ''}
            onChange={(e) => handleChange('type', e.target.value)}
            onBlur={(e) => handleBlur('type', e.target.value)}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Fixed">Fixed</option>
            <option value="%age">%age</option>
          </select>
        </div>
        {['staff', 'professional', 'mediator', 'retailer'].map((key) => (
          <div className="border px-4 py-2" key={key}>
            <Input
              className="w-full"
              type="number"
              value={distributionData[key as keyof DistributionData] ?? ''}
              onChange={(e) =>
                handleChange(key as keyof DistributionData, e.target.value === '' ? null : Number(e.target.value))
              }
              onBlur={(e) =>
                handleBlur(key as keyof DistributionData, e.target.value === '' ? null : Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Distribution;
