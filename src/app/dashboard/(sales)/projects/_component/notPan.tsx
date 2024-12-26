"use client"
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Adjust based on your setup
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Modal from "@/components/model/custom-modal";
import AddClientDialog from "@/app/dashboard/client/_component/AddClientDialog";

const formSchema = z.object({
  businessType: z.string().min(1, "Select a business type"),
  businessState: z.string().min(1, "Select a state"),
  businessName:z.string()
});

const NotPan = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "",
      businessName:"",
      businessState: "",
    },
  });
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => setIsModalOpen2(true);
  const closeModal = () => setIsModalOpen2(false);
  const onSubmit = () => {
    console.log("Form Data:");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="private">Private Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="businessName"
          render={() => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Business Name" disabled  value="Business Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business State</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<div className="flex justify-between mt-2">
          <div>
            <p className="text-[10px] text-[#091747] font-medium">
              client/Contact Person
            </p>
          </div>
          <div>
            <p
              className="text-[#f21300] text-[9px] font-medium cursor-pointer"
              onClick={openModal}
            >
              Create Client
            </p>
            <Modal isOpen={isModalOpen2} onClose={closeModal}>
              <AddClientDialog onClose={closeModal} />
            </Modal>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#f21300] w-full text-white rounded"
        >
          Create Business
        </button>
      </form>
    </Form>
  );
};

export default NotPan;
