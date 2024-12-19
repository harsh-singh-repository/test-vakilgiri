// import { Button } from '@/components/ui/button'
import AddNewBussinessDialog from "@/app/dashboard/business/_component/add-new-bussiness-dialog";
import Modal from "@/components/model/custom-modal";
import { useGetBussinessOfClient } from "@/hooks/clients/manage-client";
import { useLinkBussiness } from "@/hooks/leads/manage-leads";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

interface LinkBussinessProp {
  clientId: string;
  leadId: string;
}

interface ClinetBusinessType {
  id: string;
  businessName: string;
  businessPan: string;
  businessType: string; // You can add other possible types here
  businessStatus: string | null;
}

const LinkBussiness = ({ clientId, leadId }: LinkBussinessProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bussinessId, setBussinessId] = useState<string>("");

  const queryClient = useQueryClient();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate: LinkBussiness } = useLinkBussiness(leadId);

  const handleDivClick = (id: string) => {
    setBussinessId(id);
  };

  const handleLinkBussiness = () => {
    LinkBussiness(
      { businessId: bussinessId },
      {
        onSuccess: () => {
          toast.success(`Bussiness Linked`);
          queryClient.invalidateQueries({ queryKey: ["leadId"] });
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            // Safely access the response data
            const errorMessage =
              error.response?.data?.message || "An unexpected error occurred.";
            // console.log("Axios Error Message:", errorMessage);

            // Display error message in toast
            toast.error(`${errorMessage}`);
          } else {
            // Handle non-Axios errors
            toast.error("An unexpected error occurred.");
          }
        },
      }
    );
  };

  const { data } = useGetBussinessOfClient(clientId);

  return (
    <div className="flex justify-center items-center flex-col p-0">
      <span className="text-[14px] text-[#091747] font-semibold">
        Link Bussiness
      </span>

      {data && (
        <div className="flex flex-col gap-y-1 mt-1 mb-1 w-full">
          {data.map((clientBussiness: ClinetBusinessType, index: number) => {
            const isActive = bussinessId === clientBussiness.id;

            return (
              <div
                className={`flex flex-col px-2 text-[#091747] cursor-pointer rounded-sm ${
                  isActive ? "bg-[#f21300] text-white" : "hover:bg-[#FFD7D7]"
                }`}
                key={index}
                onClick={() => handleDivClick(clientBussiness.id)}
              >
                <span className="text-[13px] uppercase font-semibold">
                  {clientBussiness.businessName}
                </span>
                <div className="flex flex-row gap-x-2 text-[13px]">
                  <span className="font-semibold">PAN:</span>
                  <span className="font-medium">
                    {clientBussiness.businessPan}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-row gap-x-2">
        <button
          className="bg-[#f21300] hover:bg-[#f21300] px-3 py-2 text-[12px] text-white rounded-md"
          onClick={handleLinkBussiness}
        >
          Link Bussiness
        </button>
        <button
          className="hover:bg-[#f21300] bg-[#091747] px-3 py-2 text-[12px] text-white rounded-md"
          onClick={openModal}
        >
          Add Bussiness
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} className="p-4">
          <AddNewBussinessDialog onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default LinkBussiness;
