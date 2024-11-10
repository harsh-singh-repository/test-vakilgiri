import { RxAvatar } from "react-icons/rx";

const ClientShowcase = () => {
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
    {
      tableId: 5,
      tableName: "Table 5",
      clients: [
        { name: "Kara Daniels", date: "2024-11-01", workingStatus: "Active" },
        { name: "Leo Foster", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Mia Garcia", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 6,
      tableName: "Table 6",
      clients: [
        { name: "Nina Howard", date: "2024-11-01", workingStatus: "Active" },
        { name: "Owen Johnson", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Paula King", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 7,
      tableName: "Table 7",
      clients: [
        { name: "Quinn Lewis", date: "2024-11-01", workingStatus: "Active" },
        { name: "Riley Martin", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Sophia Nelson", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
    {
      tableId: 8,
      tableName: "Table 8",
      clients: [
        { name: "Thomas Parker", date: "2024-11-01", workingStatus: "Active" },
        { name: "Uma Quinn", date: "2024-11-02", workingStatus: "Inactive" },
        { name: "Vera Scott", date: "2024-11-03", workingStatus: "Active" },
      ],
    },
  ];

  return (
    <>
       <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
      {tables.map((table) => (
        <div key={table.tableId} className="border px-2 py-4 rounded-md shadow bg-slate-200 h-[350px] overflow-y-auto">
          <span className="text-sm font-medium mb-2 bg-[#091747] text-white px-3 text-left rounded-sm">{table.tableName}</span>
          <div className="flex flex-col gap-2 mt-2">
            {table.clients.map((client, clientIndex) => (
              <div key={clientIndex} className="mb-1 bg-white flex flex-row rounded-md p-2 gap-x-3 items-center">
                <RxAvatar size={30}/>

                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-[#F20101] font-medium">{client.date}</span>
                    <span className="text-[13px] text-[#091747] font-medium">{client.name}</span>
                    <div className="text-[10px] text-white bg-[#FAB515] rounded-xl text-center px-1">
                        <span>{client.workingStatus}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ClientShowcase;
