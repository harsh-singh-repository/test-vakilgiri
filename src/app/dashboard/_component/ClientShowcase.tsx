"use client"
// import { useGetBussiness } from "@/hooks/business/manage-business";
// import { useGetClients } from "@/hooks/clients/manage-client";
import { useGetLeads } from "@/hooks/leads/manage-leads";
import { RxAvatar } from "react-icons/rx";
import { LeadGetType } from "../_types/options";

const ClientShowcase = () => {
  // const tables = [
  //   {
  //     tableId: 1,
  //     tableName: "Pending Reminders",
  //     clients: [
  //       { name: "John Doe", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Jane Smith", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "Alice Johnson", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 2,
  //     tableName: "New/ Unassigned Leads",
  //     clients: [
  //       { name: "Bob Brown", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Carol White", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //       { name: "David Clark", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 3,
  //     tableName: "New/ Unassigned Clients",
  //     clients: [
  //       { name: "Emily Davis", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Frank Evans", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Grace Harris", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 4,
  //     tableName: "New/ Unassigned Business",
  //     clients: [
  //       { name: "Henry Adams", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Ivy Brooks", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Jack Carter", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 5,
  //     tableName: "Table 5",
  //     clients: [
  //       { name: "Kara Daniels", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Leo Foster", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Mia Garcia", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 6,
  //     tableName: "Table 6",
  //     clients: [
  //       { name: "Nina Howard", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Owen Johnson", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Paula King", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 7,
  //     tableName: "Table 7",
  //     clients: [
  //       { name: "Quinn Lewis", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Riley Martin", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Sophia Nelson", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  //   {
  //     tableId: 8,
  //     tableName: "Table 8",
  //     clients: [
  //       { name: "Thomas Parker", date: "2024-11-01", workingStatus: "Active" },
  //       { name: "Uma Quinn", date: "2024-11-02", workingStatus: "Inactive" },
  //       { name: "Vera Scott", date: "2024-11-03", workingStatus: "Active" },
  //     ],
  //   },
  // ];

  // const {data} = useGetClients();
  const {data:leadData} = useGetLeads();
  // const {data:bussinessData} = useGetBussiness();

  const unassignedLeads = leadData?.filter((lead:LeadGetType) => 
    lead.assigned.length === 0
  );
  // const unassignedBussiness = leadData?.filter((lead:LeadGetType) => lead.assigned === null) || [];

  console.log(leadData);
  console.log(unassignedLeads);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
        <div
          // key={table.tableId}
          className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
        >
          <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          Pending Reminder
          </span>
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[350px]">
            {leadData?.map((leads:LeadGetType, index:number) => (
              <div
                key={index}
                className="mb-1 bg-white flex flex-row rounded-md p-2 gap-x-3 items-center"
              >
                <RxAvatar size={35} />

                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-[#F20101] font-medium">
                    {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                  </span>
                  <span className="text-[13px] text-[#091747] font-medium uppercase">
                    {leads.firstName + " " + leads.lastName}
                  </span>
                  <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                    <span>{`Status: ${leads.status}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          // key={table.tableId}
          className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
        >
          <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Leads
          </span>
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[350px]">
            {unassignedLeads?.map((leads:LeadGetType, index:number) => (
              <div
                key={index}
                className="mb-1 bg-white flex flex-row rounded-md p-2 gap-x-3 items-center"
              >
                <RxAvatar size={35} />

                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-[#F20101] font-medium">
                    {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                  </span>
                  <span className="text-[13px] text-[#091747] font-medium uppercase">
                  {leads.firstName + " " + leads.lastName}
                  </span>
                  <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                    <span>{`Status: ${leads.status}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          // key={table.tableId}
          className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
        >
          <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Clients
          </span>
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[350px]">
            {leadData?.map((leads:LeadGetType, index:number) => (
              <div
                key={index}
                className="mb-1 bg-white flex flex-row rounded-md p-2 gap-x-3 items-center"
              >
                <RxAvatar size={35} />

                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-[#F20101] font-medium">
                    {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                  </span>
                  <span className="text-[13px] text-[#091747] font-medium uppercase">
                    {leads.firstName}
                  </span>
                  <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                    <span>{`Status: ${leads.status}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          // key={table.tableId}
          className="border px-2 py-4 rounded-md shadow bg-[#E2E2E2]"
        >
          <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">
          New/ Unassigned Business
          </span>
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-[350px]">
            {leadData?.map((leads:LeadGetType, index:number) => (
              <div
                key={index}
                className="mb-1 bg-white flex flex-row rounded-md p-2 gap-x-3 items-center"
              >
                <RxAvatar size={35} />

                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-[#F20101] font-medium">
                    {`LED${index} | ${leads.createdAt.split("T")[0]}`}
                  </span>
                  <span className="text-[13px] text-[#091747] font-medium uppercase">
                    {leads.firstName}
                  </span>
                  <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                    <span>{`Status: ${leads.status}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ClientShowcase;
