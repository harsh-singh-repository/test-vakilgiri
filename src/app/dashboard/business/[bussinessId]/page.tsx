"use client";
import React, { useState } from "react";
import BusinessIdCardSection from "../_component/business-id-card";
import BussinessDetailCard from "../_component/BussinessDetailCard";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BussinessIdSettings from "../_component/BussinessIdSettings";
import { useParams } from "next/navigation";
import FinancialsPage from "../_component/FinancialsPage";
import RegistrationLayout from "../_component/RegestrationLayout";
import { useGetBussinessById } from "@/hooks/business/manage-business";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Modal from "@/components/model/custom-modal";
import AddFile from "./_component/AddFile";
import LinkClient from "./_component/LinkClient";
import BussinessClientTable from "./_component/BussinessClientTable";
import NoFiles from "./_component/NoFiles";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const params = useParams();

  const paramsId = params.bussinessId;

  const { data } = useGetBussinessById(paramsId);

  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [isLinkClientModalOpen, setIsLinkClientModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const openAddFileModal = () => setIsAddFileModalOpen(true);
  const closeAddFileModal = () => setIsAddFileModalOpen(false);

  const openLinkClientModal = () => setIsLinkClientModalOpen(true);
  const closeLinkClientModal = () => setIsLinkClientModalOpen(false);

  console.log("Bussiness Id", data);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#f21300"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-[6fr_2fr] lg:grid-cols-[6fr_2fr] sm:grid-col-1 xs:grid-col-1  grid-col-1 gap-x-4 p-5 items-start h-full bg-[#E2E2E2]">
      <div className="flex flex-col gap-y-3">
        <div className="bg-[#091747] px-3 py-2 rounded-md flex flex-row justify-between items-center">
          <span className="uppercase text-white font-semibold">
            {data?.businessName}
          </span>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger>
              <div className="max-h-fit max-w-fit p-1 rounded-md bg-[#F21300] hover:bg-white hover:text-[#F21300] cursor-pointer text-white">
                <Plus strokeWidth={"4"} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="flex flex-col text-[#091747] text-[14px] font-medium">
                <div
                  className="flex item-center hover:bg-[#FFE7E7] p-2 rounded-sm cursor-pointer"
                  onClick={openAddFileModal}
                >
                  Add File
                </div>
                <Modal isOpen={isAddFileModalOpen} onClose={closeAddFileModal}>
                   <AddFile onClose={closeAddFileModal} openDialogId={paramsId}/>
                </Modal>

                <div
                  className="flex item-center  p-2 rounded-sm hover:bg-[#FFE7E7] cursor-pointer"
                  onClick={openLinkClientModal}
                >
                  Link Client
                </div>
                <Modal
                  isOpen={isLinkClientModalOpen}
                  onClose={closeLinkClientModal}
                >
                  <LinkClient onClose={closeLinkClientModal} bussinessId={paramsId}/>
                </Modal>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <BusinessIdCardSection />
        <Tabs defaultValue="client" className="w-full">
          <TabsList className="bg-white text-[#091747]">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="regestration">Registration</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="enquire">Enquire</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="financials">
            <FinancialsPage />
          </TabsContent>
          <TabsContent value="regestration">
            <RegistrationLayout />
          </TabsContent>
          <TabsContent value="client">
            <BussinessClientTable bussinessId={paramsId}/>
          </TabsContent>
          <TabsContent value="settings">
            <BussinessIdSettings bussinessId={paramsId} />
          </TabsContent>
          <TabsContent value="file">
            <NoFiles/>
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden md:hiddem lg:block xl:block">
        <BussinessDetailCard bussinessId={paramsId}/>
      </div>
    </div>
  );
};

export default Page;
