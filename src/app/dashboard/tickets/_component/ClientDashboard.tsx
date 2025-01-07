import { 
  Dialog, 
  // DialogOverlay
 } from "@/components/ui/dialog";
// import { DialogTrigger } from "@/components/ui/dialog";
// import { Database } from "lucide-react";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import ClientDetailDialog from "./ClientDetailDialog";

const ClientDashboard = () => {
  const tables = [
    {
      tableId: 1,
      tableName: "Table 1",
      clients: [
        { name: "John Doe", date: "2024-11-01", workingStatus: "Active" },
        { name: "Jane Smith", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
        { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 2,
      tableName: "Table 2",
      clients: [
        { name: "Bob Brown", date: "2024-11-01", workingStatus: "Active" },
        { name: "Carol White", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 3,
      tableName: "Table 3",
      clients: [
        { name: "Emily Davis", date: "2024-11-01", workingStatus: "Active" },
        { name: "Frank Evans", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Grace Harris", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 4,
      tableName: "Table 4",
      clients: [
        { name: "Henry Adams", date: "2024-11-01", workingStatus: "Active" },
        { name: "Ivy Brooks", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Jack Carter", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
  ];

  return (
    <Dialog>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {tables.map((table) => (
          <div
            key={table.tableId}
            className="border px-2 py-4 rounded-md shadow bg-slate-200 h-[350px] overflow-y-auto"
          >
            <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
              {table.tableName}
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {table.clients.map((client, clientIndex) => (
                  <div className="flex justify-between items-center bg-white p-2 rounded-md"  key={clientIndex}>
                    <div className="flex flex-col items-start w-[6.25rem]">
                      <span className="text-[10px] text-[#F20101] font-medium">
                        {client.date}
                      </span>
                      <span className="text-[13px] text-[#091747] font-medium">
                        {client.name}
                      </span>
                      <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                        <span>{client.workingStatus}</span>
                      </div>
                    </div>   
                        <RxAvatar size={30}/>
                  </div>
              ))}
            </div>
          </div>
        ))}
        <ClientDetailDialog tables={tables}/>
      </div>
      </Dialog>
  );
};

export default ClientDashboard;
