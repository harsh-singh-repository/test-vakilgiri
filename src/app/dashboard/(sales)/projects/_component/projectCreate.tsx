"use client";
import React, { useEffect, useState } from "react";
import ServiceInfo from "./serviceInfo";
import { ImCross } from "react-icons/im";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgressBar } from "./progressBar";
import { FormModal } from "@/app/dashboard/tickets/_components/ticketFormModal";
import CreateBusiness from "./createBusiness";
import axios from "axios";
import { getSession } from "next-auth/react";
import { debounce } from "lodash";

interface Business {
  id: string;
  businessName: string;
  businessPan: string;
  businessType: string;
  businessStatus: string | null;
}

interface ApiResponse {
  statusCode: number;
  data: Business[];
  message: string;
  success: boolean;
  errors: string[];
}

const projectSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  state: z.string().min(1, "State is required"),
  contactPerson: z.string().min(1, "Contact/Concerned Person is required"),
  service: z.string().min(1, "Service is required"),
});

interface ProjecctCreateProps {
  close: () => void;
}
const ProjectCreate: React.FC<ProjecctCreateProps> = ({ close }) => {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      businessName: "",
      state: "",
      contactPerson: "",
      service: "",
    },
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const onSubmit = () => {
    console.log("Form Data:");
    setCurrentStep(currentStep + 1);
    // Perform further actions such as API calls
  };
  const { watch } = form;
  const businessNameValue = watch("businessName");
  const [businessData, setBusinessData] = useState<Business[] | null>(null);
  const [showBusinessSearch,setShowBusinessSearch]=useState(true)
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [businessStorage, setBusinessStorage] = useState<Business>();
  const handleBusinessClick=(business:Business)=>{
        setShowBusinessSearch(false)
        setBusinessStorage(business)
        form.setValue("businessName", business.businessName);
  }
  useEffect(() => {
    const fetchBusinessData = debounce(async () => {
      if (!businessNameValue) {
        setShowBusinessSearch(true)
        return;
      }

      try {
        const session = await getSession();
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/search?query=${businessNameValue}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setBusinessData(response.data.data);
        } else {
          console.error("Failed to fetch business data:", response.data.errors);
        }
      } catch (error) {
        console.log("Error fetching business data:", error);
      }
    }, 300); // Wait for 300ms pause before calling the API

    fetchBusinessData();

    return () => fetchBusinessData.cancel(); // Cancel pending debounce on cleanup
  }, [businessNameValue]);

  useEffect(() => {
    console.log(businessData);
  }, [businessData]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="grid grid-cols-3 rounded-md">
      <div className="col-span-2 bg-gray-200 p-6 min-h-full w-full">
        <ServiceInfo />
      </div>
      <div className="col-span-1 bg-white p-6">
        <div className="relative flex items-center justify-center">
          {/* Centered Header */}
          <div className="text-center">
            <h2 className="text-[20px] font-poppins text-[#000000] font-bold">
              Create Project
            </h2>
            <p className="text-[13px] text-[#f21300] max-w-xs font-poppins font-medium">
              Fill all the information correctly to avoid duplicacy.
            </p>
          </div>

          {/* Cross Icon */}
          <div
            className="absolute right-0 top-0 text-[#f21300] cursor-pointer"
            onClick={close}
          >
            <ImCross size={18} />
          </div>
        </div>
        <div className="mt-1 mb-2 max-h-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Business Name */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-medium font-poppins text-[#091747]">
                        Business
                      </div>
                      <div>
                        <label
                          className="text-xs cursor-pointer text-[#f21300]"
                          onClick={handleOpenModal}
                        >
                          Create Business
                        </label>
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={businessStorage?.businessName || 'Business Name'} 
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {businessData && businessNameValue && showBusinessSearch && (
              <div className="flex flex-col gap-0.5">
                {businessData.map((business, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center text-xs p-1 bg-[#E7E7E7] cursor-pointer"
                      onClick={()=>handleBusinessClick(business)}
                    >
                      <div className="flex text-left w-full text-[#091747] font-semibold font-poppins text-[14px]">
                        {business.businessName.toUpperCase()}
                      </div>
                      <div className="flex text-left w-full text-[#091747] font-medium font-poppins text-[14px]">
                        <strong>PAN:</strong> {` ${business.businessPan}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* State Field */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium font-poppins text-[#091747]">
                    State
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="state1">State 1</SelectItem>
                        <SelectItem value="state2">State 2</SelectItem>
                        <SelectItem value="state3">State 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Person Field */}
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium font-poppins text-[#091747]">
                    Contact/Concerned Person
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">Client 1</SelectItem>
                        <SelectItem value="client2">Client 2</SelectItem>
                        <SelectItem value="client3">Client 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Field */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium font-poppins text-[#091747]">
                    Select Service
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service1">Service 1</SelectItem>
                        <SelectItem value="service2">Service 2</SelectItem>
                        <SelectItem value="service3">Service 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="mt-4 w-full">
              Save & Continue
            </Button>
          </form>
        </Form>
        {isModalOpen && (
          <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <CreateBusiness close={handleCloseModal} />
          </FormModal>
        )}
      </div>
    </div>
  );
};

export default ProjectCreate;
