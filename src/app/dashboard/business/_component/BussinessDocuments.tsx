"use client";

import Modal from "@/components/model/custom-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddFileNewBussiness from "./AddFileNewBussiness";

export default function BussinessDocuments() {
  const documents = [
    {
      id: 1,
      name: "Upload Trust Deed/ Certificate of Incorporation/ Society Deed",
    },
    { id: 2, name: "Upload Pan Card of your NGO" },
    { id: 3, name: "Upload 12AB (Provisional/ Final) Certificate" },
    { id: 4, name: "Upload 80G (Provisional/ Final) Certificate" },
    { id: 5, name: "Upload FCRA Certificate" },
    { id: 6, name: "Upload NGO Darpan/ Niti Aayog Certificate" },
    { id: 7, name: "Upload CSR-1 Certificate" },
    { id: 8, name: "Upload GST Certificate" },
  ];

  // const handleFileChange = (id: number, file: File | null) => {
  //   setDocuments((prev) =>
  //     prev.map((doc) => (doc.id === id ? { ...doc, file } : doc))
  //   );
  // };

  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);

  const openAddFileModal = () => setIsAddFileModalOpen(true);
  const closeAddFileModal = () => setIsAddFileModalOpen(false);

  return (
    <div className="mx-auto space-y-2">
      <div className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
        Documents
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex justify-between items-center gap-4">
            <div className="text-[13px] font-medium">
              {doc.id}. {doc.name}
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                className="bg-[#0A1157] text-white hover:bg-[#0A1157]/90 min-w-[120px]"
                onClick={openAddFileModal}
              >
                Select File
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isAddFileModalOpen} onClose={closeAddFileModal}>
        <AddFileNewBussiness onClose={closeAddFileModal} />
      </Modal>

      <div className="space-y-4">
        <div className="inline text-[10px] bg-[#091747] text-left px-2 py-1 font-semibold rounded-md max-w-fit text-white">
          Uploaded Files
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#f32100] hover:bg-[#f32100]/70 text-white px-8">
          Save & Proceed
        </Button>
      </div>
    </div>
  );
}
