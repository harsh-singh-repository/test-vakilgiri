import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSession } from "next-auth/react";
import { MaterialInput } from "@/components/material-input";

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  status: z.enum(["active", "inactive"], { required_error: "Status is required" }),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  file: z
    .any()
    .refine((files) => files && files.length > 0, "File is required if provided"),
});

type FormData = z.infer<typeof formSchema>;
interface AddCategoryProps {
  again: () => void;
}
const AddCategory: React.FC<AddCategoryProps> = ({ again }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading,setLoading]=useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      status: undefined,
      title: "",
      description: "",
      file: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name); 
      form.setValue("file", files);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    console.log(data); 
    try {
      const session = await getSession();
      const token = session?.user?.accessToken;
      if (!token) {
        throw new Error("Bearer token not found");
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.title); // API expects "name" for the title
      formData.append("description", data.description || ""); // Optional description
      formData.append("code", data.id);
      if (data.file) {
        formData.append("icon", data.file[0]); // Append the selected file
      }

      // Send POST request
      const response = await fetch(
        "https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/service-category",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      setLoading(false)
      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        alert(`Error: ${error.message || "Failed to submit form"}`);
      } else {
        const result = await response.json();
        console.log("API Success:", result);
        again();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 max-w-xs mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {/* File Upload */}
          <div className="col-span-1 flex flex-col justify-center items-center border border-dashed border-gray-400 rounded-md h-full bg-gray-100 p-4">
            <label htmlFor="file-upload" className="text-gray-500 text-center cursor-pointer">
              {fileName ? (
                <span>{fileName.slice(0, 5)}...</span> // Show file name after upload
              ) : (
                "Click to Upload"
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="col-span-2 space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MaterialInput placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MaterialInput placeholder="Enter ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Enter Description" className="h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#f21300] hover:bg-red-600 text-white w-full" disabled={loading}>
          {
            loading? "loading...":"save"
          }
        </Button>
      </form>
    </Form>
  );
};

export default AddCategory;
