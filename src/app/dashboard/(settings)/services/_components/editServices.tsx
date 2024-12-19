"use client"
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Services } from "../types";
import Quotation from "../serviceEdit/quotation";
import Setting from "../serviceEdit/setting";
import { FormModal } from "./formModal";
import ContentCreate from "../serviceEdit/contentCreate";
import Content from "../serviceEdit/content";
import Distribution from "../serviceEdit/distribution";

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
                    activeButton==="Content" && <button className="text-white bg-red-600 p-1 rounded-md"
                    onClick={()=>setIsModalOpen(true)}
                    >create</button>
                  }
                  <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
                      <div>
                       <ContentCreate data={data} close={handleCloseModal}  contentfetch={contentfetch} 
  setContentfetch={setContentfetch} />
                      </div>
                      </FormModal>
                    <button className=" bg-red-600 rounded-md h-8 w-8 flex items-center justify-center hover:bg-white"
                    onClick={close}
                    ><Cross1Icon 
                    className="stroke-white hover:stroke-red-600 h-8" 
                    style={{ strokeWidth: '2px' }} 
                  /></button>
                </div>
            </div>
            <div className="flex flex-wrap mt-4 space-x-2">
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeButton === button
                ? "bg-red-500 text-white"
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
