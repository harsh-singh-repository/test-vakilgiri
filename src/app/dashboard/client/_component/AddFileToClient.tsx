"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useAddFiletoClient } from "@/hooks/clients/manage-client"
import { useQueryClient } from "@tanstack/react-query"

// Zod schema
const fileSchema = z.object({
  File_Name: z.string().min(1, "File name is required"),
  file: z.instanceof(File, { message: "A file is required" }),
  clientId: z.string().min(1, "Business ID is required"),
  Visibility:z.boolean().default(false).optional()
})

interface FileUploadForm {
  File_Name: string
  file: File
  clientId: string | string[] | undefined
  Visibility?:boolean
}

interface OnCloseProp {
  onClose: () => void
  clientId: string | string[] | undefined
}

export default function AddFileToClient({ onClose,clientId}: OnCloseProp) {
  const { mutate: AddFiles } = useAddFiletoClient()

  const form = useForm<FileUploadForm>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      File_Name: "",
      file: undefined as unknown as File, // Ensure a valid default value
      clientId: clientId,
      Visibility: false, // Pass businessId here
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")
  const queryClient = useQueryClient();

  const onSubmit = (data: FileUploadForm) => {
    console.log("Submitted Data:", data);
    console.log("Submitted File:", data.file);
    console.log("Submitted File type:", typeof(data.file));
  
    AddFiles(data,{
      onSuccess: () => {
        toast.success("File Uploaded Successfully")
        queryClient.invalidateQueries({
          queryKey: ["clientFiles"]
        });
        onClose()
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred."
          toast.error(`Failed to Upload: ${errorMessage}`)
        } else {
          toast.error("An unexpected error occurred.")
        }
      },
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Take the first file (single upload)
    if (file) {
      form.setValue("file", file) // Set the single file
      form.setValue("File_Name", file.name) // Set the single file
      setFileName(file.name) // Update UI with the file name
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="px-4 py-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden Business ID Field */}
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="hidden" {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          />

          {/* File Upload Section */}
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <div
                  className="border-2 border-dashed border-[#f21300] rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors w-[256px] h-[86px]"
                  onClick={triggerFileUpload}
                >
                  <input
                    type="file"
                    accept="*/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <p className="text-gray-500">
                    {fileName || "Click to upload a file"}
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Name Input */}
          <FormField
            control={form.control}
            name="File_Name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter File Name"
                    {...field}
                    className="focus:border-[#f21300] border-[#f21300]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <Button
            type="submit"
            className="w-full bg-[#f21300] hover:bg-[#F54233] text-white"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-[#091747] font-light"
            onClick={onClose}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  )
}
