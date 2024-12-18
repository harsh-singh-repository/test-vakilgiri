import React from "react";
import LabelForm, { FormValues } from "./labelForm";
import { FormModal } from "../_components/formModal";

// Props interface for FormModal (assuming this exists in your codebase

// CustomFee component
function CustomFee() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [formDataArray, setFormDataArray] = React.useState<FormValues[]>([]);

  // Open and close modal handlers
  const handleOpenModal = (): void => setIsModalOpen(true);
  const handleCloseModal = (): void => setIsModalOpen(false);

  // Handle form submission
  const handleFormSubmit = (data: FormValues): void => {
    setFormDataArray((prev) => [...prev, data]); // Add new fee data to the list
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="container mx-auto p-2">
      {/* Header Section */}
      <div className="flex gap-4 items-center mb-6">
        <h1 className="text-lg font-bold text-blue-950">Custom Wise Fees</h1>
        <button
          onClick={handleOpenModal}
          className="bg-green-700 text-white text-xs px-4 h-6 rounded-full hover:bg-green-800"
        >
          + Create
        </button>
      </div>

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-4">
          <LabelForm onSubmit={handleFormSubmit} close={handleCloseModal}/>
        </div>
      </FormModal>

      {/* Fee List Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {formDataArray.map((data, index) => (
          <FeeCard key={index} data={data} index={index} />
        ))}
      </div>
    </div>
  );
}

export default CustomFee;

// FeeCard Component
interface FeeCardProps {
  data: FormValues;
  index: number;
}

const FeeCard: React.FC<FeeCardProps> = ({ data, index }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-blue-950 text-white py-2 px-4">
        <h3 className="text-lg font-semibold">Fee {index + 1}</h3>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <span className="font-medium">Label Name:</span>{" "}
            <span className="text-gray-700">{data.labelName}</span>
          </li>
          <li>
            <span className="font-medium">Field Type:</span>{" "}
            <span className="text-gray-700">{data.fieldType}</span>
          </li>
          {data.fieldType === "dropdown" && data.dropdownOptions && (
            <li>
              <span className="font-medium">Dropdown Options:</span>
              <ul className="mt-1 pl-4 list-disc text-gray-700">
                {data.dropdownOptions.map((option, idx) => (
                  <li key={idx}>
                    {option.name} ({option.value})
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li>
            <span className="font-medium">Fee Type:</span>{" "}
            <span className="text-gray-700 capitalize">{data.feeType.replace("_", " ")}</span>
          </li>
          <li>
            <span className="font-medium">Value:</span>{" "}
            <span className="text-gray-700">{data.value}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
