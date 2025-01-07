"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "next-auth/react";
import { TicketCategory } from "../page";
import { toast } from "sonner";


// Define the Zod schema for validation
const ticketSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  category: z.string().min(1, { message: "Category is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  file: z.any().optional(),
});

// Infer the TypeScript types from the Zod schema
type TicketFormValues = z.infer<typeof ticketSchema>;

interface CreateTicketDialogProps {
  onClose: () => void;
  fetchAgain: () => void;
  category:TicketCategory[]
}

const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({ onClose, fetchAgain,category }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      email: "",
      category: "login",
      subject: "",
      description: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    setLoading(true);
    try {
      const session = await getSession();
      console.log("Form data:", data);
      const matchedCategory = category.find((cat) => cat.name === data.category);
    console.log(matchedCategory);
  
    const id = matchedCategory?.id;
      // Prepare the JSON payload
      const payload = {
        body: data.description, // Assuming your form field name is 'body'
        subject: data.subject, // Ensure your form has a 'subject' field
        categoryId: id, // Hardcoded for now
        status: "New", // Default status as per backend requirements
        // serviceId: data.serviceId || undefined, // Optional fields
        // projectId: data.projectId || undefined,
        // businessId: data.businessId || undefined,
        // leadId: data.leadId || undefined,
        // userId: data.userId || undefined,
        // managers: data.managers || undefined,
        // ticketFile: data.file || "",
      };
  
      // Make API request (update URL as necessary)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to create ticket");
      }
      if(response.ok){
        toast.success('Ticket added successfully!', {
          description: 'Your Ticket has been made successfully.',
        });
      }
      console.log("Ticket created successfully:", await response.json());
      fetchAgain();
      onClose();
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error('Failed to submit', {
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4 flex items-center">
  <div className="flex-1 flex justify-between w-full">
    <CardTitle className="text-xl font-bold text-center w-full">Create a Ticket</CardTitle>
  
  <Button variant="ghost" size="icon" onClick={onClose} className="bg-blue-950 text-white h-5 w-5 hover:bg-blue-950 hover:text-white">
    <X className="h-3 w-3" />
  </Button>
  </div>
</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email ID</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label>Select Category</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                  {category.map((cat, index) => (
                  <SelectItem key={index} value={cat.name}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Label>Subject</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter subject" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe your issue" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              name="file"
              render={({ field }) => (
                <FormItem>
                  <Label>Upload Supporting File</Label>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-red-600 text-white hover:bg-blue-950 hover:text-white" variant="ghost" disabled={loading}>
              {loading ? "Submitting..." : "Create Ticket"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateTicketDialog;
