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
import CreateBusiness from "./createBusiness";
import axios from "axios";
import { getSession } from "next-auth/react";
import { debounce } from "lodash";
import { AiOutlineBank, AiOutlineCheckCircle } from "react-icons/ai";
import { SmallModal } from "@/app/dashboard/tickets/_components/smallModal";
import { Services } from "@/app/dashboard/(settings)/services/types";
import { getServices } from "@/app/dashboard/(settings)/services/page";
import Modal from "@/components/model/custom-modal";

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
  const [services, setServices] = useState<Services[]>([]);
  useEffect(() => {
    async function fetchData() {
      const serviceData = await getServices();
      setServices(serviceData)
    }
    fetchData();
  }, []);
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
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleRing = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  
    const items = [
      { title: "1. 12A PROVISIONAL REGISTRATION", description: "dsjlvgbdfsivu sd/li yvlsdi" },
      { title: "2. ABC", description: "asd" },
      { title: "3. 80G REGISTRATION", description: "sdv sdvsd" },
      { title: "4. ISO", description: "iso reg" },
    ];
    const [discount, setDiscount] = useState<number>(0);
    const governmentFee = 1600.0;
    const modulesFee = 0.0; // Placeholder
    const professionalFees = 2500.0;
    const gstRate = 0.18;
  
    const baseQuotation = governmentFee + modulesFee + professionalFees;
    const gstAmount = (baseQuotation - discount) * gstRate;
    const finalQuotation = baseQuotation - discount + gstAmount;
    const states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry"
  ]
  
    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setDiscount(value > baseQuotation ? baseQuotation : value);
    };
    const [selectedServiceId,setSelectedServiceId]=useState<string>("")
    
    // const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);

    // const handleOpenSmallModal = () => setIsSmallModalOpen(true);
    // const handleCloseSmallModal = () => setIsSmallModalOpen(false);
  const firstStep=()=>{
    return (
      <div>
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
                        {
                          states.map((state,index)=>{
                            return <SelectItem value={state} key={index}>{state}</SelectItem>
                          })
                        }
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
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value); // Update the form field value
                        console.log("service id", value); // Log the selected service ID
                        setSelectedServiceId(value)
                      }} 
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service, index) => (
                          <SelectItem 
                            key={index} 
                            value={service.id}
                          >
                            {service.ServiceName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="mt-4 w-full bg-[#f32100] text-white hover:bg-[#f32100]/70">
              Save & Continue
            </Button>
          </form>
        </Form>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <CreateBusiness close={handleCloseModal} />
          </Modal>
        )}
      </div>
    )
}
  const secondStep=()=>{
    return (
      <div className="max-w-lg mx-auto bg-white">
        <div className="space-y-4">
          <div>
            <label htmlFor="authCapital" className="block text-sm font-medium text-gray-700">
              Authorised Capital*
            </label>
            <select
              id="authCapital"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="upto1lac">upto 1 Lac</option>
              <option value="1to5lac">upto 5 Lac</option>
              <option value="5to10lac">upto 10 Lac</option>
              <option value="5to10lac">upto 15 Lac</option>
            </select>
          </div>
  <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="promoters" className="block text-sm font-medium text-gray-700">
              No. of Promoters*
            </label>
            <select
              id="promoters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="2">2 Promoters</option>
              <option value="3">3 Promoters</option>
              <option value="4">4 Promoters</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="dscs" className="block text-sm font-medium text-gray-700">
              No. of DSCs*
            </label>
            <select
              id="dscs"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="2">2 Promoters</option>
              <option value="3">3 Promoters</option>
              <option value="4">4 Promoters</option>
            </select>
          </div>
          </div>
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-blue-950">Service Addons</h3>
            <div className="mt-2 space-y-2">
  {items.map((item, index) => (
    <div
      key={index}
      className={`bg-red-100 p-2 rounded-md shadow-sm cursor-pointer ${
        activeIndices.includes(index) ? "ring-2 ring-[#f32100] bg-red-200" : ""
      }`}
      onClick={() => toggleRing(index)}
    >
      <strong>{item.title}</strong>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  ))}
</div>

          </div>
  
          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">
              Suggested Names & Other Information
            </label>
            <textarea
              id="specialInstructions"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter Special Instructions"
            ></textarea>
          </div>
  
          <div className="flex items-center">
            <input
              id="sendDetails"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="sendDetails" className="ml-2 block text-sm text-gray-700">
              Send Project details on mail to Client?
            </label>
          </div>
  
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <button
              className="px-4 py-2 bg-[#091747] font-medium text-white rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={()=>setCurrentStep(1)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-[#f32100] text-white font-medium rounded-md hover:bg-[#f32100] focus:outline-none"
              onClick={()=>setCurrentStep(3)}
            >
              Calculate Cost
            </button>
          </div>
        </div>
      </div>
    );
  }
  const thirdStep=()=>{
    return (
      <div className="max-w-fit mx-auto bg-white rounded-lg text-xs">
        <table className="w-full border-separate border-spacing-y-1 rounded-xl">
          <thead>
            <tr className="text-left text-white bg-blue-950 rounded-xl">
              <th className="py-1 px-2">Quotation</th>
              <th className="py-1 px-2 text-right">Discount</th>
              <th className="py-1 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-2">Government Fee</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right">₹{governmentFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-1 px-2">Modules Fee</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right">₹{modulesFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-1 px-2">Professional Fees</td>
              <td className="py-1 px-2">
                <input
                  type="number"
                  value={discount}
                  onChange={handleDiscountChange}
                  className="w-full border rounded-sm px-1 py-0.5 text-right"
                  placeholder="Enter Discount"
                />
              </td>
              <td className="py-1 px-2 text-right">₹{professionalFees.toFixed(2)}</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="py-1 px-2 font-semibold">Base Quotation</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right font-semibold">₹{baseQuotation.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-1 px-2">Less: Discount</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right text-[#f32100]">-₹{discount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-1 px-2">Add: GST @ 18%</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right">₹{gstAmount.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-950 text-white font-medium">
              <td className="py-1 px-2 font-semibold">Final Quotation</td>
              <td className="py-1 px-2"></td>
              <td className="py-1 px-2 text-right font-semibold">₹{finalQuotation.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
    
        <div className="bg-red-50 p-3 rounded-xl flex items-center justify-between shadow-sm">
  <div className="flex items-center space-x-2">
  <div className="text-[#f32100]">
  <AiOutlineBank className="h-8 w-8" />
</div>
    <div>
      <div className="text-[#f32100] font-semibold text-sm">Wallet Balance</div>
      <div className="text-blue-950 font-extrabold text-xl">₹3,476,612.06</div>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <button className="bg-[#f32100] text-white p-1 rounded-full text-sm shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.93V16h-2v.93A8.12 8.12 0 014.07 13H6v-2H4.07A8.12 8.12 0 0111 4.07V6h2V4.07A8.12 8.12 0 0119.93 11H18v2h1.93A8.12 8.12 0 0113 16.93zM12 14a2 2 0 112-2 2 2 0 01-2 2z"
        />
      </svg>
    </button>
    <button className="bg-[#f32100] text-white p-1 rounded-full text-sm shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M11 9h2v6h-2zm1 13a10 10 0 100-20 10 10 0 000 20zm0-18a8 8 0 11-8 8 8 8 0 018-8z"
        />
      </svg>
    </button>
  </div>
</div>
        <div className="grid grid-cols-2 w-full gap-2 mt-4">
          <button
            className="px-2 py-2 bg-blue-950 text-white rounded-sm text-xs hover:bg-blue-900 focus:outline-none"
            onClick={()=>setCurrentStep(2)}
          >
            Back
          </button>
          <button
            className="px-2 py-2 bg-[#f32100] text-white rounded-sm text-xs hover:bg-[#f32100] focus:outline-none"
            onClick={handleOpenModal}
          >
            Create Project
          </button>
        </div>
        {isModalOpen && (
        <SmallModal isOpen={isModalOpen} onClose={handleCloseModal}>
         <div className="max-w-md mx-auto bg-white p-4 text-center space-y-2">
  <h2 className="text-blue-950 font-bold text-xl">Are you sure?</h2>
  <p className="text-[#f21300] font-poppins text-sm">
    You are going to create a project. Amount will be deducted from your Wallet.
  </p>
  <div className="text-blue-950 font-semibold text-lg">Section-8 Registration</div>
  <div className="space-y-2">
    <button className="w-full bg-[#f32100] text-white py-2 rounded-md font-medium hover:bg-[#f32100]"
    onClick={()=>setCurrentStep(4)}
    >
      Create Project & Pay
    </button>
    <button className="w-full text-blue-950 py-2 rounded-md font-medium"
    onClick={handleCloseModal}
    >
      Cancel
    </button>
  </div>
</div>
        </SmallModal>
      )}
      </div>
    );
  }
  const fourthStep=()=>{
    return (
      <div className="max-w-sm mx-auto bg-white p-4 text-center space-y-1">
      {/* Success Icon and Message */}
      <div>
        <div className="text-[#f32100]">
          <AiOutlineCheckCircle className="h-8 w-8 mx-auto" />
        </div>
        <h2 className="text-[#f32100] font-bold text-lg mt-1">Success</h2>
        <p className="text-blue-950 font-medium text-xs">
          Your Project has been created successfully
        </p>
      </div>

      {/* Project Details */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-blue-950 text-white text-left font-semibold px-3 py-1 text-sm">
          Project Details
        </div>
        <div className="bg-gray-100 text-blue-950 text-left px-3 py-2 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="font-medium">Project ID</span>
            <span>P160</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Service</span>
            <span>Section-8 Registration</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Created by</span>
            <span>Nahar</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Created on</span>
            <span>24-12-2024</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quotation</span>
            <span>—</span>
          </div>
        </div>
      </div>

      {/* Upload Documents Button */}
      <div>
        <button className="w-full bg-[#f32100] text-white py-2 rounded-md font-medium text-xs hover:bg-[#f32100]"
        onClick={()=>setCurrentStep(5)}
        >
          Upload Documents &rarr;
        </button>
      </div>
    </div>
    )
  }
  const fifthStep=()=>{
    return (
      <div className="max-w-sm mx-auto bg-white p-4 text-center space-y-4">
  {/* Header */}
  <h2 className="text-blue-950 font-bold text-lg">Upload Documents</h2>

  {/* Required Documents List */}
  <div className="text-left text-sm text-blue-950 font-medium space-y-1">
    <p>Required Documents:</p>
    <ol className="list-decimal pl-4">
      <li>COI</li>
      <li>PAN, Aadhaar</li>
      <li>Photo</li>
      <li>Mobile Number</li>
      <li>Email Ids</li>
    </ol>
  </div>

  {/* File Upload Section */}
  <div className="flex items-center space-x-2">
    {/* Select Button */}
    <label
      htmlFor="file-upload"
      className="cursor-pointer border border-dashed border-gray-400 px-4 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100"
    >
      Select
    </label>
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={(e) => console.log(e.target.files)} // Handle file selection here
    />
    {/* File Name */}
    <input
      type="text"
      placeholder="File Name"
      className="flex-grow border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-600"
      readOnly
    />
    {/* Save Icon */}
    <button className="bg-blue-950 p-2 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2zM7 5h10v4H7V5zm6 14H9v-3h4v3zm2-5H7v-4h8v4z" />
      </svg>
    </button>
  </div>

  {/* View Project Button */}
  <button className="w-full bg-[#f32100] text-white py-2 rounded-md font-medium text-sm hover:bg-[#f32100]">
    View Project &raquo;
  </button>
</div>
    )
  }
  return (
    <div className="grid grid-cols-3 rounded-md w-full">
      <div className="col-span-2 bg-gray-200 p-6 min-h-full">
        <ServiceInfo id={selectedServiceId} name={(services.find((service) => service.id === selectedServiceId))?.ServiceName || ''}/>
      </div>
      <div className="col-span-1 bg-white p-6 min-h-[800px] w-full">
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
            <ImCross size={15} />
          </div>
        </div>
        <div className="mt-1 mb-2 max-h-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
          {
           currentStep===1 &&  firstStep()
           ||
           currentStep===2 && secondStep()
           ||
           currentStep===3 && thirdStep()
           ||
           currentStep===4 && fourthStep()
           ||
           currentStep===5 && fifthStep()
          }
      </div>
    </div>
  );
};


export default ProjectCreate;
