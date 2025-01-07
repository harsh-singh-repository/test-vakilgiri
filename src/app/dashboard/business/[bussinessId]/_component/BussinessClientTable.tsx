import { useGetBussinessById } from '@/hooks/business/manage-business';
import React, { FC} from 'react';
import { useSearchParams } from "next/navigation";
import { ClientTable } from './ClientTable';
import { columns } from './columns';

interface BussinessClientTableProps {
  bussinessId: string | string[] | undefined;
}

const BussinessClientTable: FC<BussinessClientTableProps> = ({ bussinessId }) => {
  const { data} = useGetBussinessById(bussinessId);


  const clientData = data?.businessUsers;

  console.log("Clinet Data",clientData)
  
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;
//   const [searchValue, setSearchValue] = useState(
//     searchParams.get("search") || ""
//   );   // Adjust this according to your API response structure

  return (
    <div>
       {clientData && (
        <ClientTable
          searchKey="search"
        //   searchValue={searchValue}
          pageNo={page}
          columns={columns(bussinessId)}
          totalUsers={clientData.length}
          data={data?.businessUsers}
          pageCount={Math.ceil(clientData.length / pageLimit)}
        />
      )}
    </div>
  );
};

export default BussinessClientTable;
