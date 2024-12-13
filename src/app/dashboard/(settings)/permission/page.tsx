import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { role, roleColumn } from "./columns";
import { RoleTable } from "./data-table";
export async function getData(): Promise<role[]>{
    return [
      {
        Sno: 1,
        userType: "Admin",
        role: "Manager",
        department: "Operations",
        Assigned: "John Doe",
      },
      {
        Sno: 2,
        userType: "User",
        role: "Team Lead",
        department: "Development",
        Assigned: "Jane Smith",
      },
      {
        Sno: 3,
        userType: "Admin",
        role: "Supervisor",
        department: "Support",
        Assigned: "Bob Johnson",
      },
      {
        Sno: 4,
        userType: "User",
        role: "Developer",
        department: "Development",
        Assigned: "Alice Davis",
      },
      {
        Sno: 5,
        userType: "User",
        role: "Analyst",
        department: "Marketing",
        Assigned: "Charlie Brown",
      },
    ]
}


  export default async function DemoPage() {
    const data = await getData();
    return (
      <div className="flex flex-col p-4">
        <div className="ml-3 mb-3 mt-1 flex justify-between">
          <div> <h1 className="text-black font-semibold text-xl">Roles & Permissions</h1></div>
          <div className="text-white bg-red-500 mr-3 hover:bg-blue-900 hover:cursor-pointer"><PlusIcon size={30}/></div>
        </div>
        <div>
        <RoleTable data={data} columns={roleColumn}/>
        </div>
      </div>
    );
  }
  
