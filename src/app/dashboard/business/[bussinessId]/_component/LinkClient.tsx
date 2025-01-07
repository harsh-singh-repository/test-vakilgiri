'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { clientDetailsType } from '@/app/dashboard/(sales)/leads/_types';
import { cn } from '@/lib/utils';
import { useAddClientToBussiness } from '@/hooks/business/manage-business';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchClinetQuery } from '@/hooks/clients/manage-client';
// import { cn } from '@/lib/utils'

interface onCloseProp {
    onClose: () => void;
    bussinessId:string | string [] | undefined
}


export default function LinkClient({onClose,bussinessId}:onCloseProp) {
  const [isSearchVisible, setIsSearchVisible] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedClientId, setSelectedClientId] = React.useState<string>("");

  const queryClient = useQueryClient();

  const { data } = useSearchClinetQuery(searchQuery);

  const {mutate:addClientToBussiness} = useAddClientToBussiness(bussinessId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLinkClient = (id:{clientIds:string[]}) =>{
    addClientToBussiness(id,{
      onSuccess:()=>{
          toast.success(`Client Added to Bussiness`);
          queryClient.invalidateQueries({queryKey:["bussinessId"]})
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          // Safely access the response data
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          // console.log("Axios Error Message:", errorMessage);

          // Display error message in toast
          toast.error(`Failed to Link Client: ${errorMessage}`);
        } else {
          // Handle non-Axios errors
          toast.error("An unexpected error occurred.");
        }
      },
    })
  }

  console.log("Dat",data)
  console.log("clientdid",selectedClientId)

  return (
    <div className="">
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Link Client</h2>
          <button 
            onClick={onClose} 
            className="text-[#f21300]"
          >
            <X strokeWidth={"3"}/>
          </button>
        </div>
        
        <div className="text-red-500 text-sm mb-4">
          Fill all the information correctly to avoid duplicacy.
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Client/ Contact Person</div>
          <div className="text-sm text-blue-600">Create Client</div>
        </div>

        <div className="mt-4 relative">
          {isSearchVisible ? (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Client- PAN/ Email/ Mobile"
                className="px-4"
                onChange={handleChange}
              />
              <button
                onClick={() => setIsSearchVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchVisible(true)}
              className="border rounded-full p-2 hover:bg-gray-50"
            >
              <Search className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
        <div className="text-xs text-[#091747] flex flex-col gap-y-2 w-full cursor-pointer mt-2">
          {data?.map((searchClient: clientDetailsType, index: number) => {
            const isSelected = searchClient.id === selectedClientId;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col px-2 py-1 rounded-md",
                  isSelected ? "bg-[#FFD7D7]" : "bg-transparent"
                )}
                onClick={() => {
                  setSelectedClientId(searchClient.id);
                  handleLinkClient({clientIds:[searchClient.id]});
                }}
              >
                <span className="font-semibold">
                  {searchClient.firstName + " " + searchClient.lastName}
                </span>
                <div className="flex">
                  <span className="font-semibold uppercase">PAN:</span>
                  <span>{searchClient.pan}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold">[M]:</span>
                  <span>{searchClient.mobileNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold">[E]:</span>
                  <span>{searchClient.email}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

