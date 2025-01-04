"use client"
import { useEffect, useState } from "react";
import { Plus} from "lucide-react";
import { role, roleColumn } from "./columns";
import { RoleTable } from "./data-table";
import { getSession } from "next-auth/react";
import { ImCross } from "react-icons/im";
import AddRole from "./_components/addRole";
import Modal from "@/components/model/custom-modal";

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
  const [fetchagain,setFetchagain]=useState<boolean>(false)
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      const fetchedData = await getData();
      setData(fetchedData); // Set the fetched data
      setLoading(false); // Stop loading
    }
    fetchData();
  }, [fetchagain]); // Empty dependency array ensures this runs once on mount
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFetch=()=>{
    setFetchagain(!fetchagain)
  }
  return (
    <div className="flex flex-col px-2 py-2 bg-gray-100 overflow-hidden h-screen">
      <div className="mb-3 mt-1 flex justify-between">
        <div className="p-2">
          <h1 className="text-[#091747] font-semibold font-poppins text-[20px]">Roles & Permissions</h1>
        </div>
        <div className="mr-2 py-2">
      {/* Add Button */}

      <button
        onClick={handleOpenModal}
        className="w-[30px] h-[30px] py-[5px] bg-[#f21300] text-white rounded flex items-center justify-center hover:bg-[#091747]"
        title="Add"
      >
         <Plus strokeWidth={"5"} height={20}/>
      </button>

      {/* Modal for Adding Category */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-[17px] text-[#f21300] font-bold mb-4">Create Role</h2>
              <button onClick={handleCloseModal} className="stroke-[#f21300] mb-4 text-[13px] text-[#f21300]">
                <ImCross/>
              </button>
            </div>
            <AddRole again={handleFetch} />
          </div>
        </Modal>
      )}
    </div>
      </div>
      <div className="flex-1 overflow-auto rounded-2xl">   
          <RoleTable data={data} columns={roleColumn} />
      </div>
    </div>
  );
}
