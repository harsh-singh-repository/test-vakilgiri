"use client"
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { role, roleColumn } from "./columns";
import { RoleTable } from "./data-table";
import { getSession } from "next-auth/react";

// Define a function to fetch data from the API
export async function getData(): Promise<role[]> {
  const session = await getSession();
  const token = session?.user.accessToken;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/rolePermission`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.statusText}`);
    }

    const apiResult = await response.json();

    // Map the API result to match the required data structure
    const mappedData: role[] = apiResult.data.map((item: role, index: number) => ({
      id:item.id,
      Sno: index + 1,
      userType: item.userType,
      role: item.name,
      department: "N/A", // Replace with the actual department if available in the API
      Assigned: "N/A", // Replace with the actual assigned person if available in the API
    }));

    return mappedData;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<role[]>([]); // State to store the fetched data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      const fetchedData = await getData();
      setData(fetchedData); // Set the fetched data
      setLoading(false); // Stop loading
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex flex-col p-4 bg-gray-100 overflow-hidden h-screen">
      <div className="ml-3 mb-3 mt-1 flex justify-between">
        <div>
          <h1 className="text-black font-semibold text-xl">Roles & Permissions</h1>
        </div>
        <button
          className="text-white bg-red-500 mr-3 hover:bg-blue-900 hover:cursor-pointer"
          aria-label="Add Role"
        >
          <PlusIcon size={30} />
        </button>
      </div>
      <div className="flex-1 overflow-auto rounded-2xl">   
          <RoleTable data={data} columns={roleColumn} />
      </div>
    </div>
  );
}
