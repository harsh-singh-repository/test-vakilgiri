import { FileText } from 'lucide-react'

export default function NoFiles() {
  return (
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