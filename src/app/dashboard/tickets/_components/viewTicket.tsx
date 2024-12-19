"use client";
import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { getSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TicketCategory } from "../page";
import axios from "axios";
import { IoIosSave, IoMdEye } from "react-icons/io";
import { Button } from "@/components/ui/button";
import TicketReplyCreate from "./ticketReplyCreate";
import { toast } from "sonner";
interface TicketCreator {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  pan: string;
  address1: string;
  address2: string;
  alternateMobileNumber: string;
}
interface Ticket {
  sn: string;
  id: string;
  body: string;
  status: string;
  subject: string;
  leadId: string | null;
  businessId: string;
  projectId: string | null;
  serviceId: string | null;
  userId: string | null;
  ticketFile: string | null;
  categoryId: string;
  createdAt: string;
  modifiedAt: string;
  slug: string | null;
  managerId: string | null;
  creatorId: string;
  creator: TicketCreator;
  category: TicketCategory;
}
interface ViewTicketProps {
  ticket: Ticket;
  close: () => void;
  handleFetchagain: () => void;
  tickets: Ticket[];
}
interface TicketReplyFile {
  fileName: string;
  fileURL: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
}

interface TicketReply {
  id: string;
  ticketId: string;
  replyBody: string;
  createdAt: string;
  modifiedAt: string;
  creatorId: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
  replyFile: TicketReplyFile[];
}

const ViewTicket: React.FC<ViewTicketProps> = ({
  ticket,
  close,
  handleFetchagain,
  tickets,
}) => {
  const [status, setStatus] = useState<string>(ticket.status);
  const [data,setData]=useState<Ticket>(ticket);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const[replyfetchagain,setReplyfetchagain]=useState(false)

  const handleReplyFetchagain=()=>{
    setReplyfetchagain(true)
  }
  const handleSave = async () => {
    console.log("Selected Status:", status);
    const formData = new FormData();

    formData.append("status", status);

    try {
      const session = await getSession();
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      console.log("Ticket updated successfully", response.data);
      if(response.status>=200 && response.status<400){
        toast.success('Ticket status updated successfully!', {
          description: 'Your Ticket status has been updated successfully.',
        });
      }
    } catch (error) {
      console.error("Error updating ticket", error);
      toast.error('Failed to update', {
        description: 'Please try again later.',
      });
    } finally {
      handleFetchagain();
    }
  };
  const fetchTicketReplies = async () => {
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket-reply/ticket/${data.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const replyData = await response.json();
      console.log("Ticket Replies:", replyData);
      return replyData.data
    } catch (error) {
      console.error("Failed to fetch ticket replies:", error);
    }
  };

  useEffect(() => {
    const getReplies = async () => {
      const data = await fetchTicketReplies();
      setReplies(data);
    };
    getReplies();
    setReplyfetchagain(false)
  }, [data.id,replyfetchagain]);

  const sameCreatorTickets = useMemo(
    () => tickets.filter((tkt) => tkt.creatorId === data.creatorId),
    [tickets, data.creatorId]
  );
  
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear();
  
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
    const amPm = date.getHours() >= 12 ? 'pm' : 'am';
  
    // Suffix for day (e.g., 1st, 2nd, 3rd)
    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${daySuffix(day)} ${month}, ${year}, ${hours}:${minutes} ${amPm}`;
  };
  return (
    <div className="p-3">
      <div className="flex justify-between mb-1">
        <div className="flex gap-2">
          <div className="text-xl font-bold">
            {`Tickets | #${data.sn} | ${new Date(data.modifiedAt)
              .toLocaleDateString("en-GB")
              .replaceAll("/", "-")}`}
          </div>
          <div className="flex justify-center items-center">
            {(data.status === "Open" && (
              <div className="bg-red-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                Open
              </div>
            )) ||
              (data.status === "Closed" && (
                <div className="bg-green-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Closed
                </div>
              )) ||
              (data.status === "New" && (
                <div className="bg-gray-400 text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
                  New
                </div>
              ))}
          </div>
        </div>

        <div
          className="p-1 bg-blue-950 rounded-xl text-white cursor-pointer"
          onClick={close}
        >
          <X />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <div className="bg-gray-200 rounded-xl p-2">
            <strong>Category:</strong>
            {` ${data.category.name}`}
          </div>
          <div className="bg-gray-200 rounded-xl p-2 mt-1">
            <strong>Subject:</strong>
            {` ${data.subject}`}
          </div>
          <div>
  <ScrollArea className="min-h-10 max-h-80 flex flex-col gap-4">
    {replies.length > 0 ? (
      replies.map((reply, index) => (
        <div key={index} className="bg-red-100 p-2 rounded-xl mt-2">
          <div className="flex flex-col">
            <div className="font-bold">{reply.creator?.firstName || "Unknown"}</div>
            <div className="text-gray-700">{reply.replyBody || "No content"}</div>
            <div className="text-xs text-[#f21300]">
              {reply.modifiedAt ? formatDate(reply.modifiedAt) : "No date available"}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500">No replies available</div>
    )}
  </ScrollArea>

</div>
{
  data.status!=='Closed' && (
  <div className="flex flex-col justify-end h-fit">
            <div className="p-2">
            <TicketReplyCreate data={data} handleFetchagain={handleReplyFetchagain}/>
            </div>
          </div>)
}
          
        </div>
        <div className="col-span-2">
          <div className="bg-gray-200 p-2 h-16 rounded-xl flex flex-col">
            <div className="ml-3">
              <strong>Manager</strong>
            </div>
            <div className="flex mb-1 gap-2 ml-3">
              <div>
                <div className="relative inline-block">
                  {/* Avatar */}
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {/* Minus Sign */}
                  <div className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 rounded-full text-[#f21300] text-xs font-bold cursor-pointer">
                    <X strokeWidth={5} />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-dashed border-black text-[#f21300] font-bold cursor-pointer hover:bg-gray-200">
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 bg-gray-200 mt-2 h-16 rounded-xl gap-1 items-center">
            {/* Avatar Section */}
            <div className="col-span-1 flex justify-center items-center">
              <div className="rounded-full w-14 h-14 overflow-hidden">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Name Section */}
            <div className="col-span-4 flex flex-col justify-center leading-none text-sm">
              <div>
                <strong>Name:</strong>
                {` ${data.creator.firstName}`}
              </div>
              <div>
                <strong>Mobile:</strong>
                {` ${data.creator.mobileNumber}`}
              </div>
              <div>
                <strong>Email:</strong>
                {` ${data.creator.email}`}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 p-2 mt-2 rounded-xl">
            <strong>Ticket info</strong>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <strong className="ml-3">Previous Ticket</strong>
            <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
              <div className="flex flex-col leading-tight">
                {/* {sameCreatorTickets.map((tkt, index) => {
                  return <div key={index}>{`${tkt.sn} - ${tkt.subject}`}</div>;
                })} */}
                <div className="text-lg"><strong>{`${sameCreatorTickets[0].sn} - `}</strong>{`${sameCreatorTickets[0].subject}`}</div>
                <div className="text-[#f21300] text-sm font-medium">{formatDate(sameCreatorTickets[0]?.modifiedAt)}</div>
              </div>
              <div className="flex gap-2">
              <div className="flex justify-center items-center">
            {(sameCreatorTickets[0].status === "Open" && (
              <div className="bg-red-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                Open
              </div>
            )) ||
              (sameCreatorTickets[0].status === "Closed" && (
                <div className="bg-green-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Closed
                </div>
              )) ||
              (sameCreatorTickets[0].status === "New" && (
                <div className="bg-gray-400 text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
                  New
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center">
          <Button
            className="bg-[#042559] text-white p-1 h-6 text-md" onClick={()=>setData(sameCreatorTickets[0])}>
            <IoMdEye  />
          </Button>
          </div>
              </div>
            </div>
            <div className="flex justify-between bg-gray-200 p-4 rounded-xl">
              <div className="flex flex-col leading-tight">
                {/* {sameCreatorTickets.map((tkt, index) => {
                  return <div key={index}>{`${tkt.sn} - ${tkt.subject}`}</div>;
                })} */}
                <div className="text-lg"><strong>{`${sameCreatorTickets[1]?.sn} - `}</strong>{`${sameCreatorTickets[1]?.subject}`}</div>
                <div className="text-[#f21300] text-sm font-medium">{formatDate(sameCreatorTickets[1]?.modifiedAt)}</div>
              </div>
              <div className="flex gap-2">
              <div className="flex justify-center items-center">
            {(sameCreatorTickets[1]?.status === "Open" && (
              <div className="bg-red-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                Open
              </div>
            )) ||
              (sameCreatorTickets[1]?.status === "Closed" && (
                <div className="bg-green-500 text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Closed
                </div>
              )) ||
              (sameCreatorTickets[1]?.status === "New" && (
                <div className="bg-gray-400 text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
                  New
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center">
          <Button
            className="bg-[#042559] text-white p-1 h-6 text-md" onClick={()=>setData(sameCreatorTickets[1] || '')}>
            <IoMdEye  />
          </Button>
          </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 p-2 flex flex-col rounded-xl">
            <div>
              <strong>Ticket Status</strong>
            </div>
            <div className="mt-2 flex items-center gap-2">
              {/* Rounded-xl select component */}
              <select
                className="rounded-xl p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="New">New</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Save button */}
              <button
                className="bg-[#091747] text-white px-4 py-2 rounded-xl hover:bg-blue-950"
                onClick={handleSave}
              >
                <IoIosSave />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
