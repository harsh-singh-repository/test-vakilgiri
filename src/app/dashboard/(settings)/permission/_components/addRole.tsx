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
  type: z.enum(["Admin", "Client", "Staff", "Retailer"]).optional(),
  title: z.string().min(1, "Title is required"),
  department: z.enum(["accounts", "legal", "contentWriting", "sales", "support", "Admin"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddCategoryProps {
  again: () => void;
}

const AddRole: React.FC<AddCategoryProps> = ({ again }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      title: "",
      department: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const session = await getSession();
      const token = session?.user?.accessToken;
      if (!token) {
        throw new Error("Bearer token not found");
      }

      const payload = {
        name: data.title,
        userType: data.type,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rolePermission`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      setLoading(false);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
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
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 max-w-xs mx-auto">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaterialInput placeholder="Enter Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Retailer">Retailer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="department"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accounts">Accounts</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="contentWriting">Content Writing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-[#f21300] hover:bg-red-600 text-white w-full" disabled={loading}>
            {loading ? "Loading..." : "Create Role"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddRole;
