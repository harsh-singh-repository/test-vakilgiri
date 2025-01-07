import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface CustomDatePickerProps {
  className?: string;
  value?: string; // Accepts a date string in "YYYY-MM-DD" format
  onChange?: (value: string) => void; // Callback for when the date changes
  min?: string; // Minimum date
  max?: string; // Maximum date
  placeholder?: string; // Placeholder text
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  className,
  value,
  onChange,
  min,
  max,
  placeholder = "Select a date",
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <input
      type="date"
      value={currentValue}
      onChange={handleChange}
      className={cn(
        "w-full text-xs py-2 px-2 bg-white border border-gray-300 rounded-lg hover:border-gray-500 hover:shadow-lg transition-all duration-200 ease-in-out",
        className
      )}
      style={{
        colorScheme: 'light',
      }}
      min={min}
      max={max}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CustomDatePicker;
