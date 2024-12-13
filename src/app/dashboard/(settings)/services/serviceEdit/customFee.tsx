import React from "react";
import LabelForm, { FormValues } from "./labelForm"; 
import { FormModal } from "../_components/formModal";

function CustomFee() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formDataArray, setFormDataArray] = React.useState<FormValues[]>([]); 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data: FormValues) => {
    setFormDataArray((prev) => [...prev, data]); 
    setIsModalOpen(false); 
  };

  return (
    <div>
      <div className="flex gap-2 w-full">
        <p className="text-blue-950 font-bold font-poppins text-xl">Custom Wise Fees</p>
        <div
          className="bg-green-700 h-6 px-4 flex justify-center items-center rounded-full text-white text-xs cursor-pointer"
          onClick={handleOpenModal}
        >
          Create
        </div>
        <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <LabelForm onSubmit={handleFormSubmit} />
          </div>
        </FormModal>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {formDataArray.map((data, index) => (
          <div
            key={index}
            className="border border-gray-300 shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold text-white bg-blue-950 p-2 ml-2">Fee {index + 1}</h3>
            <ul className="mt-2 space-y-1 bg-white p-4">
              {Object.entries(data).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span>
                  <span className="text-gray-700">{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomFee;
