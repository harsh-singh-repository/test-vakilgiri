"use client"
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Services } from "../types";
import Quotation from "../serviceEdit/quotation";
import Setting from "../serviceEdit/setting";
import ContentCreate from "../serviceEdit/contentCreate";
import Content from "../serviceEdit/content";
import Distribution from "../serviceEdit/distribution";
import Modal from "@/components/model/custom-modal";

interface EditServicesProps {
  data: Services; 
  close: () => void; 
  onToggle: (id: string, newActive: boolean) => void;
}

const EditServices: React.FC<EditServicesProps> = ({ data, close, onToggle }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
      // const handleOpenModal = () => setIsModalOpen(true);
      const handleCloseModal = () => setIsModalOpen(false);
  const [activeButton, setActiveButton] = useState("Content");
  const buttons=[
    "Content",
    "Quotation",
    "Distribution",
    "Settings"
  ]
  const [contentfetch,setContentfetch]=useState(false)
  return (
    <div className="p-2 h-auto">
    <ScrollArea className="h-auto max-h-[calc(80vh-250px)] rounded-lg p-1 overflow-y-auto">
        <div>
            <div className="w-full bg-blue-950 flex justify-between rounded-lg h-10">
                <div className=" text-white font-bold ml-4 flex items-center space-x-2">
                    <h1 className="text-lg">[{data.ServiceId}]</h1>
                    <h1 className="text-lg">{data.ServiceName}</h1>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  {
                    activeButton==="Content" && <button className="text-white bg-[#f21300] px-2 py-1 text-xs rounded-md"
                    onClick={()=>setIsModalOpen(true)}
                    >create</button>
                  }
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                      <div>
                       <ContentCreate data={data} close={handleCloseModal}  contentfetch={contentfetch} 
  setContentfetch={setContentfetch} />
                      </div>
                      </Modal>
                      <div
  className="bg-[#f21300] rounded-md h-5 w-7 flex items-center justify-center group cursor-pointer"
  onClick={close}
>
  <div
    className="bg-[#f21300] h-5 w-7 flex items-center justify-center rounded-md group-hover:bg-white transition-colors"
  >
    {/* Cross Icon */}
    <Cross1Icon
      className="stroke-white group-hover:stroke-[#f21300] h-3 w-5 transition-all"
      style={{ strokeWidth: '2px' }}
    />
  </div>
</div>

                </div>
            </div>
            <div className="flex flex-wrap mt-4 space-x-2">
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeButton === button
                ? "bg-[#f21300] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveButton(button)}
          >
            {button}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {
          activeButton==="Quotation" &&  <Quotation data={data}/> 
          ||
          activeButton==="Settings" && <Setting data={data} onToggle={onToggle}/>
          ||
          activeButton==="Content" && <Content contentfetch={contentfetch} 
          setContentfetch={setContentfetch} service={data}/>
          ||
          activeButton==="Distribution" && <Distribution data={data}/>
        }
      </div>
        </div>
    </ScrollArea>
    </div>
  );
};

export default EditServices;
