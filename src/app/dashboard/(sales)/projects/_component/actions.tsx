import React from "react";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiMenu } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";

// Define the Project type
interface Project {
  id: string;
  businessId: string;
  cancellationReason: string | null;
  cancelledById: string | null;
  cancelledOn: string | null;
  holdReason: string | null;
  holdedById: string | null;
  holdedOn: string | null;
  parentProjectId: string | null;
  professionalFees: number;
  projectBaseQuotation: number;
  projectContactPersonId: string;
  projectDateDue: string | null;
  projectDateStart: string | null;
  projectDescription: string;
  projectDiscount: number;
  projectEndDate: string | null;
  projectGovtFees: number | null;
  projectModuleDescription: string;
  projectModuleFee: number;
  projectState: string;
  projectStatus: string;
  projectTaxAmount: number;
  projectType: string;
  startedById: string | null;
  creatorId: string;
  modifiedAt: string;
  createdAt: string;
  slug: string | null;
  isDisabled: boolean;
  projectServiceId: string;
  projectService: {
    id: string;
    name: string;
    category_id: string;
    icon_url: string;
    description: string;
    working_days: string;
    status: string;
    createdAt: string;
    modifiedAt: string;
    creatorId: string;
  };
  projectContactPerson: {
    id: string;
    fullName: string | null;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
  code: string;
}

// Define the props for the ActionButton component
interface ActionButtonProps {
  project: Project; // Pass a single project object as props
}

const ActionButton: React.FC<ActionButtonProps> = ({ project }) => {
  const handleExternalLink = () => {
    console.log("external view pressed")
    localStorage.setItem("projectData", JSON.stringify(project));
    window.open(`/dashboard/projects/${project.code}`, "_blank"); // Navigate to a new page
  };

  const handleViewDetails = () => {
    console.log("Viewing details for:", project);
    // Add logic to view details (e.g., open modal or navigate)
  };

  const handleMoreOptions = () => {
    console.log("More options for:", project);
    // Add logic for additional options (e.g., dropdown menu)
  };

  const icons = [
    { icon: <FiExternalLink />, action: handleExternalLink },
    { icon: <BiMessageDetail />, action: handleViewDetails },
    { icon: <FiMenu />, action: handleMoreOptions },
  ];

  return (
    <div className="flex justify-center items-center gap-1">
      {icons.map((item, index) => (
        <Button
          key={index}
          className="bg-[#042559] text-white w-5 h-7 text-sm"
          onClick={item.action} // Call the corresponding action
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default ActionButton;
