import React from "react";

interface ProgressBarProps {
  currentStep: number; // Current step (1-4)
  totalSteps: number; // Total number of steps
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-600 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};