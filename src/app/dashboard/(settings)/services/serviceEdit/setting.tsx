import React, { useEffect, useState } from "react";
import { Services } from "../types";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getSession } from "next-auth/react";


interface QuotationProps {
  data: Services;
  onToggle: (id: string, newActive: boolean) => void;
}

const Setting: React.FC<QuotationProps> = ({ data, onToggle}) => {
    const [workingDays, setWorkingDays] = useState(data.workingDays);
    useEffect(() => {
        setWorkingDays(data.workingDays);
      }, [data.workingDays]);
    const handleSwitchChange = () => {
        onToggle(data.id, !data.active); 
      };
      const handleInputChange = async (value: string) => {
        setWorkingDays(value); 
        if(value.length>0){
            try {
                const session = await getSession();
                if (!session?.user.accessToken) {
                  console.error("Access token is missing.");
                  return;
                }
            
                // Create a FormData object and append the necessary fields
                const formData = new FormData();
                formData.append("name", data.ServiceName);
                formData.append("category_id", data.categoryId);
                formData.append("description", data.description || "");
                formData.append("working_days", value);
            
                const response = await axios.put(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/${data.id}`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${session.user.accessToken}`,
                      "Content-Type": "multipart/form-data", 
                    },
                  }
                );
            
                console.log("Update successful:", response.data);
              } catch (error) {
                console.error("Error updating service:", error);
              }
        }
      };
      
    return (
      <div className="ml-2">
        <h1 className="text-xl font-bold text-blue-950 mb-1">Service Settings</h1>
        <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
        <h1 className="font-medium">1. Activate/ Deactivate Service</h1>
        <h1 className="font-medium">2. Working Days to Complete this service</h1>
        </div>
        <div className="flex flex-col items-end gap-4">
  <div className="flex items-center justify-end">
    <label className="relative inline-block w-10 h-5">
      <input
        type="checkbox"
        className="peer hidden"
        checked={data.active}
        onChange={handleSwitchChange}
      />
      <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-red-500"></span>
      <span className="absolute w-4 h-4 bg-white rounded-full left-0.5 bottom-0.5 transition-transform duration-300 peer-checked:translate-x-5"></span>
    </label>
  </div>
  <div className="flex items-center justify-end w-full">
    <Input
      type="text"
      placeholder={`${workingDays}`}
      className="text-right w-32"
      onBlur={(e) => handleInputChange(e.target.value)}
    />
  </div>
</div>

        </div>
        
        
      </div>
    );
};

export default Setting;
