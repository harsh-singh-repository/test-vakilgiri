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
import { useToast } from "@/hooks/use-toast";
import { MaterialInput } from "@/components/material-input";
import { Category } from "../types";
// import { Cross2Icon } from "@radix-ui/react-icons";
import { ImCross } from "react-icons/im";

const fieldSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category_id: z.string().min(1, "Category ID is required"),
  working_days: z.string().min(1, "Working Days is required"),
  description: z.string().optional(),
  status: z.enum(["Active", "Inactive"], { required_error: "Status is required" }),
  icon: z
    .custom<FileList>(
      (val) => val instanceof FileList && val.length > 0,
      "File is required"
    )
});

type FormData = z.infer<typeof fieldSchema>;

interface addServiceProps{
  close:()=>void;
  fetch:()=>void;
  category:Category[];
}
const AddService: React.FC<addServiceProps> = ({close,fetch:refreshData,category}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      category_id: "",
      working_days: "",
      description: "",
      status: "Active",
      icon: undefined,
    },
  });
  const[loading,setLoading]=useState(false)
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("icon", files); // Update form state
    }
  };
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    console.log(category);
    setLoading(true);
  
    const matchedCategory = category.find((cat) => cat.code === data.category_id);
    console.log(matchedCategory);
  
    const id = matchedCategory?.id;
    if (!id) {
      console.error("Category ID not found");
      alert("Invalid category selected");
      setLoading(false);
      return;
    }
  
    console.log("Submitted Data:", data);
    const session = await getSession();
    const token = session?.user?.accessToken;
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category_id", id);
    formData.append("working_days", data.working_days);
    formData.append("description", data.description || "");
    formData.append("status", data.status);
    if (data.icon) {
      formData.append("icon", data.icon[0]); // Add file
    }
    console.log(formData);
  
    try {
      const response = await fetch(
        "https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/service",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        alert("Failed to submit");
        setLoading(false);
        return;
      }
  
      const serviceData = await response.json(); // Parse the created service response
      console.log(serviceData)
      const serviceId = serviceData?.data.id; // Assuming the service ID is returned in `id`
  
      console.log("Service created successfully with ID:", serviceId);
  
      // Send POST request to distribution service
      if (serviceId) {
        const distributionResponse = await fetch(
          `https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/distribution/service/${serviceId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Include any necessary data here
          }
        );
  
        if (!distributionResponse.ok) {
          const distributionError = await distributionResponse.json();
          console.error("Distribution API Error:", distributionError);
          alert("Failed to register service in distribution system");
        } else {
          console.log("Service registered in distribution system successfully");
        }
      } else {
        console.error("No service ID found in response");
      }
  
      refreshData();
      close();
  
      toast({
        variant: "default",
        title: "Success",
        description: "Service added and registered successfully!",
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 max-w-xs mx-auto">
          <div className="p-1">
            <div className="flex justify-between">
            <h1 className="text-blue-950 font-semibold text-lg">Add Service</h1>
            <button onClick={close} className="stroke-red-600 text-red-600"><ImCross/></button>
            </div>
            
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* File Upload */}
            <div className="col-span-1 flex flex-col justify-center items-center border border-dashed border-gray-400 rounded-md h-full bg-gray-100 p-4">
              <label htmlFor="file-upload" className="text-gray-500 text-center cursor-pointer">
                {fileName.slice(0,5) || "Click to Upload"}...
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>
            <div className="col-span-2 space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MaterialInput placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MaterialInput placeholder="Enter Category ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            name="working_days"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaterialInput placeholder="Enter Working Days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
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
              loading? "loading..." : "save"
            }
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddService;
