"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { toast } from "sonner";

// Zod schema for validation
const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  type: z.enum(["business", "project", "leads", "service"]),
});

// Define TypeScript types from Zod schema
type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps{
    close:()=>void
    fetchagain:()=>void
}
const CategoryForm: React.FC<CategoryFormProps> = ({close,fetchagain}) => {
    const [loading,setLoading]=useState(false)
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "business",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setLoading(true)
    try {
      const session = await getSession();
      console.log(data)
      const sendData={
        name:data.name,
        type:[data.type]
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket-category`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status>=200 && response.status<400){
        toast.success('Ticket added successfully!', {
          description: 'Your Ticket has been made successfully.',
        });
      }
      console.log("Category created successfully:", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error('Failed to submit', {
        description: 'Please try again later.',
      });
    }finally{
        setLoading(false)
        fetchagain();
    }
  };
  const handleClose=()=>{
    fetchagain();
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
        <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-4">Create Category</h1>
        <Button className="text-[#F31F0D] bg-none hover:text-red-600" variant="ghost" onClick={handleClose}>
        <X className="h-5 w-5" />
      </Button>
        </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Type */}
          <FormField
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="leads">Leads</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700" disabled={loading}>
            {
                loading? "loading...":"Create"
            }
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
