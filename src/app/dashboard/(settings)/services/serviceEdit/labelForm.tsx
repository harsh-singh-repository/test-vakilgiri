"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const formSchema = z.object({
  labelName: z.string().min(1, "Label name is required"),
  fieldType: z.string().min(1, "Field type is required"),
  dropdownOptions: z
    .array(z.object({ name: z.string().min(1), value: z.string().min(1) }))
    .optional(),
  feeType: z.enum(["govt_fee", "module_fee", "professional_fee"], { required_error: "Fee type is required" }),
  value: z.string().min(1, "Value is required"),
});

export type FormValues = z.infer<typeof formSchema>;
type LabelFormProps = {
  onSubmit: (data: FormValues) => void; // Specify the type of the onSubmit prop
};
export default function LabelForm({ onSubmit }: LabelFormProps) {
  const [dropdownFields, setDropdownFields] = useState<{ name: string; value: string }[]>([
    { name: "", value: "" }, // Initialize with one empty pair
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      labelName: "",
      fieldType: "",
      dropdownOptions: [],
      feeType: "govt_fee",
      value: "",
    },
  });

  const handleAddDropdownField = () => {
    setDropdownFields([...dropdownFields, { name: "", value: "" }]);
  };

  const handleRemoveDropdownField = (index: number) => {
    if (dropdownFields.length > 1) {
      setDropdownFields(dropdownFields.filter((_, i) => i !== index));
    }
  };

  const handleFieldChange = (index: number, field: "name" | "value", value: string) => {
    const updatedFields = [...dropdownFields];
    updatedFields[index][field] = value;
    setDropdownFields(updatedFields);
    form.setValue("dropdownOptions", updatedFields); // Sync with form state
  };

  const handleSubmit = (data: FormValues) => {
    const finalData = {
      ...data,
      dropdownOptions: data.fieldType === "dropdown" ? dropdownFields : undefined,
    };
    onSubmit(finalData); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Label Name */}
        <FormField
          name="labelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter label name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field Type */}
        <FormField
          name="fieldType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Field</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value !== "dropdown") {
                      setDropdownFields([]); // Reset dropdown fields if not dropdown
                    } else if (dropdownFields.length === 0) {
                      setDropdownFields([{ name: "", value: "" }]); // Ensure one pair for dropdown
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>{field.value || "Select field type"}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="dropdown">Dropdown</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dropdown Options (Conditional Rendering) */}
        {form.watch("fieldType") === "dropdown" && (
          <div>
            <FormLabel>Dropdown Options</FormLabel>
            {dropdownFields.map((dropdownField, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Name"
                  value={dropdownField.name}
                  onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={dropdownField.value}
                  onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveDropdownField(index)}
                  variant="outline"
                  disabled={dropdownFields.length === 1} // Disable if it's the last remaining pair
                >
                  -
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddDropdownField} variant="secondary" className="mt-2">
              + Add Option
            </Button>
          </div>
        )}

        {/* Fee Type */}
        <FormField
          name="feeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Fee</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>{field.value || "Select fee type"}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="govt_fee">Govt Fee</SelectItem>
                    <SelectItem value="module_fee">Module Fee</SelectItem>
                    <SelectItem value="professional_fee">Professional Fee</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Value */}
        <FormField
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter value" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-red-600 text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}
