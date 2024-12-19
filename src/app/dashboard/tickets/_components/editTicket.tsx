"use client";

import React, { useEffect, useState } from "react";
import { Ticket } from "../_tableComp/ticketColumn";
import { X } from "lucide-react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { TicketCategory } from "../page";
import { GrAttachment } from "react-icons/gr";
import { toast } from "sonner";

interface EditTicketProps {
  data: Ticket;
  close: () => void;
  categories:TicketCategory[];
  handleFetchagain:()=>void;
}

const EditTicket: React.FC<EditTicketProps> = ({ data, close,categories,handleFetchagain }) => {
  const [subject, setSubject] = useState(data.subject || "");
  const [body, setBody] = useState(data.body || "");
  const [categoryId, setCategoryId] = useState(data.categoryId || "");
  const [status, setStatus] = useState(data.status || "Open");
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTicketFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("body", body);
    formData.append("categoryid", categoryId);
    formData.append("status", status);
    if (ticketFile) {
      formData.append("ticketFile", ticketFile);
    }

    try {
        const session=await getSession();
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":`Bearer ${session?.user.accessToken}`
          },
        }
      );
      console.log("Ticket updated successfully", response.data);
      if(response.status>=200 && response.status<400){
        toast.success('Ticket updated successfully!', {
          description: 'Your Ticket has been updated successfully.',
        });
      }
      close();
    } catch (error) {
      console.error("Error updating ticket", error);
      toast.error('Failed to Update', {
        description: 'Please try again later.',
      });
    }finally{
      handleFetchagain()
        setLoading(false)
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
     <div className="flex items-center justify-between w-full mb-2">
  <div className="flex justify-center w-full font-bold text-xl">{`Edit: ${data.sn}`}</div>
  <div className="flex justify-end cursor-pointer" onClick={close}>
    <div className='p-1 bg-blue-950 rounded-xl text-white'> <X /></div>
  </div>
</div>
      <div className='w-full bg-gray-300 p-2 flex flex-col gap-1 rounded-xl mb-3'>
        <div><strong>Client:</strong>{` ${data.creator.firstName} ${data.creator.lastName}`}</div>
        <div className="flex gap-4">
            <div><strong>Mobile:</strong>{` ${data.creator.mobileNumber}`}</div>
            <div><strong>Email:</strong>{` ${data.creator.email}`}</div>
        </div>
</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 w-full">  <div>
          <label className="block text-sm font-medium mb-1" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="categoryId">
            Category ID
          </label>
          {/* <input
            id="categoryId"
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          /> */}
           <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >{
            categories.map((category,index)=>{
                return (
                    <option key={index} value={category.id}>{category.name}</option>
                )
            })
          }
          </select>
        </div></div>
      
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="body">
            Description
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-2">
        <div>
  <label className="block text-sm font-medium mb-1">Supportings</label>
  <div
    className="flex justify-center items-center cursor-pointer border border-dashed p-2 text-center bg-gray-200 hover:bg-gray-100 w-52 rounded-xl text-[#f21300]"
    onClick={() => document?.getElementById('ticketFile')?.click()}
  >
   <GrAttachment /> {`  Attachment`}
  </div>
  <input
    id="ticketFile"
    type="file"
    onChange={handleFileChange}
    className="hidden"
  />
</div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="Open">Open</option>
            <option value="New">New</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        </div>
       
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            disabled={loading}
          >
            {
                loading ? 'Loading...' : 'Update'
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
