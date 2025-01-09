import { FileText } from 'lucide-react'
import { FileTable } from './File-Table'
import { useSearchParams } from 'next/navigation'
import { fileColumns } from './fileColumns'
import { useGetClientFiles } from '@/hooks/clients/manage-client'

interface GetFilesProps{
  id:string | string [] | undefined
}

export default function GetFiles({id}:GetFilesProps) {


  const {data} = useGetClientFiles(id);

  console.log(data)

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 10;

  if(!data){
    return(
      <div className="w-full p-8 border-2 border-dashed rounded-lg bg-white">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="p-3 bg-white rounded-lg">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          No Files uploaded yet.
        </h3>
        <p className="text-sm text-gray-500 max-w-[400px]">
          Upload necessary files related to your NGO & Campaigns for verification.
        </p>
      </div>
    </div>
    )
  }

  return (
    <div>
        <FileTable
          searchKey="search"
          pageNo={page}
          columns={fileColumns}
          totalUsers={data.length}
          data={data}
          pageCount={Math.ceil(data.length / pageLimit)}
        />
    </div>
  ) 
}