"use client";
import { useGetBussiness } from "@/hooks/business/manage-business";
import { useGetClients } from "@/hooks/clients/manage-client";
import { useGetLeads } from "@/hooks/leads/manage-leads";
import { BussinessGetType, ClientGetType, LeadGetType } from "../_types/options";
import { FaStackExchange } from "react-icons/fa";
import Modal from "@/components/model/custom-modal";
import { StackLeadsExchangeDialog } from "../(sales)/leads/_component/table/StackLeadsExchangeDialog";
import { useEffect, useState } from "react";
import { StackBussinessExchangeDialog } from "../business/_component/tables/StackExchangeDialog";
import Profile from "../../../../public/assets/profileimg.png";
import Image from "next/image";
import { StackExchangeDialog } from "../client/_component/tables/StackExchangeDialog";

const ClientShowcase = () => {
  const { data } = useGetClients();
  const { data: leadData } = useGetLeads();
  const { data: bussinessData } = useGetBussiness();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBussinessModalOpen, setIsBussinessModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const [dialogId, setDialogId] = useState<string>("");
  const [bussinessDialogId, setBussinessDialogId] = useState<string>("");
  const [clientDialogId, setClientDialogId] = useState<string>("");

  useEffect(() => {
    console.log("Bussiness Dialog ID:", bussinessDialogId);
  }, [bussinessDialogId]);

  const openModal = (id: string) => {
    setDialogId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDialogId("");
    setIsModalOpen(false);
  };

  const openBussinessModal = (id: string) => {
    setBussinessDialogId(id);
    setIsBussinessModalOpen(true);
  };

  const closeBussinessModal = () => {
    setBussinessDialogId("");
    setIsBussinessModalOpen(false);
  };

  const openClientModal = (id: string) => {
    setClientDialogId(id);
    setIsClientModalOpen(true);
  };

  const closeClientModal = () => {
    setBussinessDialogId("");
    setIsClientModalOpen(false);
  };

  const unassignedLeads = leadData?.filter(
    (lead: LeadGetType) => !lead?.managers || lead.managers.length === 0
  );

  const unassignedClient = data?.filter(
    (client: ClientGetType) => !client.managers || client.managers.length === 0
  );
  
  // For business
  const unassignedBussiness = bussinessData?.filter(
    (business: BussinessGetType) => !business?.managers || business.managers.length === 0
  );

  // const unassignedBussiness = leadData?.filter((lead:LeadGetType) => lead.assigned === null) || [];

  console.log(leadData);
  console.log(data);
  console.log(bussinessData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      <div
        // key={table.tableId}
        className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
      >
        <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          Pending Reminder
        </span>
        <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[350px] custom-scrollbar">
          {leadData?.map((leads: LeadGetType, index: number) => (
            <div
              key={index}
              className="mb-1 bg-white flex flex-row rounded-2xl p-2 gap-x-3 items-center shadow-lg border-gray-700/30"
            >
             <Image
                alt="profile"
                src={Profile}
                height="40"
                width="40"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />

              <div className="flex flex-col items-start">
                <span className="text-[10px] text-[#F20101] font-medium">
                  {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                </span>
                <span className="text-[13px] text-[#091747] font-medium uppercase">
                  {leads.firstName + " " + leads.lastName}
                </span>
                <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                  <span>{`Status: ${leads.status}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        // key={table.tableId}
        className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
      >
        <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Leads
        </span>
        <div className="flex flex-col mt-2 overflow-y-auto h-[350px] custom-scrollbar">
          {unassignedLeads?.map((leads: LeadGetType, index: number) => (
            <div
              key={index}
              className="mb-1 bg-white flex flex-row rounded-2xl p-2 gap-x-3 items-center shadow-lg border-gray-700/30"
            >
               <Image
                alt="profile"
                src={Profile}
                 height="35"
                width="35"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />

              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] text-[#F20101] font-semibold">
                  {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                </span>
                <span className="text-[13px] text-[#091747] font-medium">
                  {leads.firstName + " " + leads.lastName}
                </span>
                <div className="flex justify-between w-full">
                  <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                    <span>{`Status: ${leads.status}`}</span>
                  </div>
                  <FaStackExchange
                    className="text-[#091747] cursor-pointer"
                    onClick={() => openModal(leads.id)}
                  />
                </div>
              </div>
              {/* <div>
                  {leads.id}
                </div> */}
              <Modal isOpen={isModalOpen} onClose={closeModal} className="">
                <StackLeadsExchangeDialog
                  onClose={closeModal}
                  openDialogId={dialogId}
                />
              </Modal>
            </div>
          ))}
        </div>
      </div>
      <div
        // key={table.tableId}
        className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
      >
        <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Clients
        </span>
        <div className="flex flex-col mt-2 overflow-y-auto h-[350px] custom-scrollbar">
          {unassignedClient?.map((client: ClientGetType, index: number) => (
            <div
              key={index}
              className="mb-1 bg-white flex flex-row rounded-2xl p-2 gap-x-3 items-center shadow-lg border-gray-700/30"
            >
              <Image
                alt="profile"
                src={Profile}
                 height="35"
                width="35"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />
              <div className="flex flex-col items-start w-full">
                <span className="text-[10px] text-[#F20101] font-semibold">
                  {`LED${index+1}`}
                </span>
                <span className="text-[13px] text-[#091747] font-medium">
                  {client.firstName + " " + client.lastName} 
                </span>
                <div className="flex justify-between w-full">
                    <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                      <span>{`Status: ${client.loginStatus}`}</span>
                    </div>
                    <FaStackExchange
                      className="text-[#091747] cursor-pointer"
                      onClick={() => openClientModal(client.id)}
                    />
                  </div>
              </div>
            </div>
          ))}
        </div>
           <Modal isOpen={isClientModalOpen} onClose={closeClientModal}>
            <StackExchangeDialog
              onClose={closeClientModal}
              openDialogId={clientDialogId}
            />
          </Modal>
      </div>
      <div
        // key={table.tableId}
        className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
      >
        <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Business
        </span>
        <div className="flex flex-col mt-2 overflow-y-auto h-[350px] custom-scrollbar">
          {unassignedBussiness?.map(
            (bussiness: BussinessGetType, index: number) => (
              <div
                key={index}
                className="mb-1 bg-white flex flex-row rounded-2xl p-2 gap-x-3 items-center shadow-lg border-gray-700/30"
              >
               <Image
                alt="profile"
                src={Profile}
                height="35"
                width="35"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />
                <div className="flex flex-col items-start w-full">
                  <span className="text-[10px] text-[#F20101] font-semibold">
                    {`BUSSINESS ${index+1} | ${
                      bussiness.createdAt.split("T")[0]
                    }`}
                  </span>
                  <span className="text-[13px] text-[#091747] font-medium">
                    {bussiness.businessName}
                  </span>
                  <div className="flex justify-between w-full">
                    <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                      <span>{`${bussiness.businessType?.replace("_"," ")}`}</span>
                    </div>
                    <FaStackExchange
                      className="text-[#091747] cursor-pointer"
                      onClick={() => openBussinessModal(bussiness.id)}
                    />
                  </div>
                </div>
              </div>
            )
          )}
          <Modal isOpen={isBussinessModalOpen} onClose={closeBussinessModal}>
            <StackBussinessExchangeDialog
              onClose={closeBussinessModal}
              openDialogId={bussinessDialogId}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ClientShowcase;
