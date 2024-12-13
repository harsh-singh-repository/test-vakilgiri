"use client";

import React, { useEffect, useState } from "react";
import { ServiceTable } from "./service-table";
import { category, categoryColumn } from "./categoryColumns";
import { columns } from "./columns";
import { PlusIcon } from "lucide-react";
import AddServices from "./_components/addServices";
import { getSession } from "next-auth/react"; 
import { Category, CategoryResponse, ServiceResponse, Services } from "./types";
import AddService from "./_components/serviceForm";
import { FormModal } from './_components/formModal';

async function getData(): Promise<Services[]> {
  const session = await getSession();
  if (!session?.user?.accessToken) {
    throw new Error("No access token found in session");
  }
  console.log("abc")
  console.log("AccessToken:", session.user.accessToken);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/service`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.statusText}`);
  }

  const fetched: ServiceResponse = await response.json();
  console.log("Fetched Data:", fetched.data);

  return fetched.data.map((service, index) => ({
    Icon: service.icon_url, 
    id:service.id,
    ServiceId: `SER${String(index + 1).padStart(2, "0")}`, 
    ServiceName: service.name,
    projects: Math.floor(Math.random() * 20), 
    workingDays:service.working_days,
    active: service.status === "Active",
    status: service.status === "Active" ? "Active" : "Inactive", 
    description: service.description,
    categoryId:service.category_id
  }));
}

async function getCategories(): Promise<Category[]> {
  const session = await getSession();
  if (!session?.user?.accessToken) {
    throw new Error("No access token found in session");
  }
  console.log("AccessToken:", session.user.accessToken);

  const response = await fetch(`https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/service-category`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const fetched: CategoryResponse = await response.json();
  console.log("Fetched Data:", fetched.data);

  // Map the backend data to the `Category` structure
  return fetched.data.map((category, index) => ({
    id: category.id,
    Icon: category.icon_url,
    code: `C${String(index + 1).padStart(3, "0")}`, // Generate sequential category codes
    name: category.name,
    description: category.description,
  }));
}
export default function DemoPage() {
  const [data, setData] = useState<Services[]>([]);
  const [categoryData, setCategoryData] = useState<category[]>([]);
  const [showAddServices, setShowAddServices] = useState(false);
  const [fetchagain,setFetchagain]=useState(false);

  const handleClose=()=>{
    setShowAddServices(false);
  }
  const handleFetch=()=>{
    setFetchagain(true);
  }
  const handleToggle = async (id: string, newActive: boolean) => {
    const session = await getSession();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/service/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ status: newActive }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update service status: ${response.statusText}`);
      }
      setData((prevData) =>
        prevData.map((service) =>
          service.id === id ? { ...service, active: newActive, status: newActive ? "Active" : "Inactive" } : service
        )
      );
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      const services = await getData();
      const categories = await getCategories();
      setData(services);
      setCategoryData(categories);
      setFetchagain(false);
    }
    fetchData();
  }, [fetchagain]);

  return (
    <div className="p-3 h-full">
      <div className="flex items-center gap-2 ml-4 mt-2 mb-2">
        <h1 className="text-2xl text-blue-950 font-bold font-poppins">Services</h1>
        <button
          className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center"
          title="Add"
          onClick={() => setShowAddServices(true)}
        >
          <PlusIcon size={26} />
        </button>
      </div>

      {showAddServices && (
      <FormModal isOpen={showAddServices} onClose={()=>setShowAddServices(false)}>
            <AddService close={handleClose} fetch={handleFetch} category={categoryData}/>
            </FormModal>
      )}

      <div className="grid grid-cols-7 gap-2 h-[100%]">
        <div className="col-span-5">
        <ServiceTable columns={columns(handleToggle, setFetchagain)} data={data} />
        </div>
        <div className="col-span-2 mr-2">
          <ServiceTable columns={categoryColumn(handleFetch)} data={categoryData} />
        </div>
      </div>
    </div>
  );
}
