"use client"
import React, { useEffect, useState } from "react";
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
import { Client } from "@/constants/data";
import { debounce } from "lodash";
import { getSession } from "next-auth/react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const formSchema = z.object({
  businessType: z.string().min(1, "Select a business type"),
  businessState: z.string().min(1, "Select a state"),
  businessName:z.string(),
  clientName:z.string()
});

const NotPan = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "",
      businessName:"",
      businessState: "",
      clientName:""
    },
  });
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => setIsModalOpen2(true);
  const closeModal = () => setIsModalOpen2(false);
  const onSubmit = () => {
    console.log("Form Data:");
  };
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

  const { watch } = form;
  const clientNameValue = watch("clientName");
  const [clientData, setClientData] = useState<Client[] | null>(null);
  const [showClientSearch, setShowClientSearch] = useState(true);
  const [clientStorage, setClientStorage] = useState<Client | null>(null);
  
  // Handle client selection
  const handleClientClick = (client: Client) => {
    setShowClientSearch(false);
    setClientStorage(client);
    form.setValue("clientName", `${client.firstName} ${client.lastName}`);
  };
  
  // Fetch client data on input
  useEffect(() => {
    const fetchClientData = debounce(async () => {
      if (!clientNameValue) {
        setShowClientSearch(true);
        return;
      }
  
      try {
        const session = await getSession();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/client?query=${clientNameValue}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
  
        if (response.data.success) {
          console.log(response)
          setClientData(response.data.data);
        } else {
          console.error("Failed to fetch client data:", response.data.errors);
        }
      } catch (error) {
        console.log("Error fetching client data:", error);
      }
    }, 300); // Wait for 300ms pause before calling the API
  
    fetchClientData();
  
    return () => fetchClientData.cancel(); // Cancel pending debounce on cleanup
  }, [clientNameValue]);
  const [showSearchClient, setShowSearchClient] = useState(false);
  const labelstyle = "text-[14px] font-poppins text-[#091747] font-medium";
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelstyle}>Business Type</FormLabel>
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
              <FormLabel className={labelstyle}>Business Name</FormLabel>
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
              <FormLabel className={labelstyle}>Business State</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
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
<div className="flex justify-between mt-2">
   <div className="flex flex-col">
              <p className={labelstyle}>client/Contact Person</p>
              {!showSearchClient ? (
                <MdClose
                  style={{
                    color: "red",
                    border: "2px dashed gray",
                    borderRadius: "50%",
                    padding: "1px",
                    fontSize: "30px",
                    height: "30px",
                    width: "30px",
                  }}
                  className="cursor-pointer ml-1 mt-1"
                  onClick={()=>setShowSearchClient(true)}
                />
              ) : (
                <div>
                <FaSearch
                  style={{
                    color: "red",
                    border: "2px dashed gray",
                    borderRadius: "50%",
                    padding: "3px",
                    fontSize: "30px",
                    height: "30px",
                    width: "30px",
                  }}
                  className="cursor-pointer ml-1 mt-1"
                  onClick={()=>setShowSearchClient(false)}
                />
                <FormField
    control={form.control}
    name="clientName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          <div className="flex justify-between items-center w-full">
            <div className="text-xs font-medium font-poppins text-[#091747]">
              Client
            </div>
            <div>
              {/* <label
                className="text-xs cursor-pointer text-[#f21300]"
                onClick={handleOpenModal}
              >
                Create Client
              </label> */}
            </div>
          </div>
        </FormLabel>
        <FormControl>
          <div className="w-full">
          <Input
            placeholder={clientStorage?.firstName || 'Search Client'}
            className="w-full"
            {...field}
          />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {clientData && clientNameValue && showClientSearch && (
    <div className="flex flex-col gap-0.5">
      {clientData.map((client, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-xs p-1 bg-[#E7E7E7] cursor-pointer"
            onClick={() => handleClientClick(client)}
          >
            <div className="flex text-left w-full text-[#091747] font-semibold font-poppins text-[14px]">
              {`${client.firstName} ${client.lastName}`.toUpperCase()}
            </div>
            <div className="flex text-left w-full text-[#091747] font-medium font-poppins text-[14px]">
              <strong>PAN:</strong> {` ${client.pan}`}
            </div>
            <div className="flex text-left w-full text-[#091747] font-medium font-poppins text-[12px]">
              {/* <strong>Email:</strong> {` ${client.email}`} */}
            </div>
          </div>
        );
      })}
    </div>
  )}
   </div>
              )}
            </div>
          <div>
            {/* <p className="text-[10px] text-[#091747] font-medium">
              client/Contact Person
            </p> */}
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
