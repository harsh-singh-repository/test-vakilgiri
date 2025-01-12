"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import Profile from "../../../../../public/assets/profileimg.png";
import Image from "next/image";
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
  updatedAt:string;
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
  updatedAt:string;
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
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailStatus: string;
  panStatus: string | null;
  userRoles: string;
  kycStatus: string;
};

interface Manager{
  id: string;
            managerType: string;
            adminStaff: {
                id: string;
                user: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    userRoles: string;
                },
                officialEmail: string;
                officialMobile: string;
            },
            professional: string;
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
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [managers,setManagers]=useState<Manager[]>([]);
  const handleReplyFetchagain=()=>{
    setReplyfetchagain(true)
  }
  const fetchAllUsers = async (): Promise<User[]> => {
    const session = await getSession();
    const token = session?.user.accessToken;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log(userData.data)
        return userData.data; // Return the fetched user data
      } else {
        console.error("Failed to fetch users");
        return []; // Return an empty array on failure
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return []; // Return an empty array on error
    }
  };
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const assignManagers = async () => {
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      for (const managerId of selectedUsers) {
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/${data.id}/manager`)
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/${data.id}/manager`,
          { managerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(`Assigned manager ${managerId}:`, response.data);
      }
      toast.success("Managers assigned successfully!");
    } catch (error) {
      console.error("Failed to assign managers:", error);
      toast.error("Failed to assign some or all managers. Please try again.");
    } finally {
      setSelectedUsers([])
      setIsDropdownVisible(false); // Close the dropdown
    }
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // Remove if already selected
        : [...prevSelected, userId] // Add if not selected
    );
    // assignManagers();
  };

  useEffect(() => {
    console.log("fetching replies")
    const getReplies = async () => {
      const data = await fetchTicketReplies();
      setReplies(data);
    };
    getReplies();
    setReplyfetchagain(false)
    console.log("fetching users")
    const getAllUsers = async () => {
      const data = await fetchAllUsers();
      setAllUsers(data.filter((user) => user.userRoles === "Staff_Manager")); 
    };
    getAllUsers();
  }, [data.id,replyfetchagain]);

  useEffect(() => {
    console.log("Updated allUsers:", allUsers);
    console.log(123)
  }, [allUsers]);
  const sameCreatorTickets = useMemo(
    () => tickets.filter((tkt) => tkt.creatorId === data.creatorId),
    [tickets, data.creatorId]
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false); // Close the dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
   if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
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
    <div className="p-3 min-w-[300px] mx-auto">
      <div className="flex justify-between mb-1">
        <div className="flex gap-2">
          <div className="text-[18px] font-poppins font-semibold">
            {`Tickets | #${data.sn} | ${new Date(data.updatedAt)
              .toLocaleDateString("en-GB")
              .replaceAll("/", "-")}`}
          </div>
          <div className="flex justify-center items-center mb-1">
            {(data.status === "Open" && (
              <div className="bg-[#f21300] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                Open
              </div>
            )) ||
              (data.status === "Closed" && (
                <div className="bg-[#008626] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Closed
                </div>
              )) ||
              (data.status === "New" && (
                <div className="bg-[#091747] text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
                  New
                </div>
              ))}
          </div>
        </div>

        <div
          className="p-1 bg-[#091747] rounded-xl text-white cursor-pointer h-8"
          onClick={close}
        >
          <X />
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2">
        <div className="grid xl:col-span-3 lg:col-span-2 md:col-span-1 sm:col-span-1">
          <div className="flex flex-col gap-2">
          <div className="bg-[#E9E9E9] rounded-xl p-4 flex items-center font-poppins text-[#091747] h-[32px] text-[14px]">
            <strong>{`Category`}</strong>
            {`: ${data.category.name}`}
          </div>
          <div className="bg-[#E9E9E9] flex items-center font-poppins text-[#091747] rounded-xl p-4 h-[32px] text-[14px]">
            <strong>Subject</strong>
            {`: ${data.subject}`}
          </div>
          <div>
  <ScrollArea className="min-h-10 max-h-80 flex flex-col gap-4">
    {replies.length > 0 ? (
      replies.map((reply, index) => (
        <div key={index} className="bg-[#fcd7d780] p-2 rounded-xl mt-2 flex gap-2">
          <div>
            <Image
                alt="profile"
                src={Profile}
                height="40"
                width="40"
                className="rounded-full mr-2"
                style={{ boxShadow: "10px 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
              />
          </div>
          <div className="flex flex-col leading-none gap-1">
            <div className="font-bold text-[14px] font-poppins text-[#091747]">{reply.creator?.firstName || "Unknown"}</div>
            <div className="text-[#091747] text-[14px] font-poppins">{reply.replyBody || "No content"}</div>
            <div className="text-[10px] text-[#f21300] font-poppins font-medium">
              {reply.updatedAt ? formatDate(reply.updatedAt) : "No date available"}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500">No replies available</div>
    )}
  </ScrollArea>

</div>
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
        <div className="grid xl:col-span-2 lg:col-span-1 md:col-span-1 sm:col-span-1 w-full">
          <div className="bg-[#E9E9E9] p-2 h-16 rounded-xl flex flex-col">
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
              <div className="relative">
        {/* Trigger Button */}
        <div
          className="flex items-center justify-center w-6 h-6 rounded-full border border-dashed border-black text-[#f21300] font-bold cursor-pointer hover:bg-[#E9E9E9]"
          onClick={toggleDropdown}
        >
          +
        </div>

        {/* Dropdown Div */}
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute top-8 left-3 w-64 bg-white border border-gray-300 shadow-lg rounded-md p-4"
          >
            <div className="max-h-48 overflow-y-auto">
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  <label htmlFor={user.id} className="text-sm  cursor-pointer">
                    {user.firstName} {user.lastName}
                  </label>
                </div>
              ))}
            </div>

            {/* Confirmation Button */}
            <button
              className="mt-4 w-full bg-[#f23100] text-white py-1 rounded-md hover:bg-red-700"
              onClick={assignManagers}
            >
              OK
            </button>
          </div>
        )}
      </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 bg-[#E9E9E9] mt-2 h-16 rounded-xl gap-1 items-center">
            {/* Avatar Section */}
            <div className="col-span-1 flex justify-center items-center">
              <div className="rounded-full w-12 h-12 overflow-hidden">
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
            <div className="col-span-4 flex flex-col justify-center leading-none text-[13px]">
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
          <div className="bg-[#E9E9E9] p-2 mt-2 rounded-xl">
            <strong>Ticket info</strong>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <strong className="ml-1 text-[15px]">Previous Ticket</strong>
            <div className="flex justify-between bg-[#E9E9E9] p-2 rounded-xl">
              <div className="flex flex-col leading-tight">
                {/* {sameCreatorTickets.map((tkt, index) => {
                  return <div key={index}>{`${tkt.sn} - ${tkt.subject}`}</div>;
                })} */}
                <div className="text-[14px]"><strong>{`${sameCreatorTickets[0].sn} - `}</strong>{`${sameCreatorTickets[0].subject}`}</div>
                <div className="text-[#f21300] text-[10px] font-medium">{formatDate(sameCreatorTickets[0]?.updatedAt)}</div>
              </div>
              <div className="flex gap-2">
              <div className="flex justify-center items-center">
            {(sameCreatorTickets[0].status === "Open" && (
              <div className="bg-[#f21300] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                Open
              </div>
            )) ||
              (sameCreatorTickets[0].status === "Closed" && (
                <div className="bg-[#008626] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Closed
                </div>
              )) ||
              (sameCreatorTickets[0].status === "New" && (
                <div className="bg-[#091747] text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
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
            {
              sameCreatorTickets[1] && (
                <div className="flex justify-between bg-[#E9E9E9] p-2 rounded-xl">
                <div className="flex flex-col leading-tight">
                  {/* {sameCreatorTickets.map((tkt, index) => {
                    return <div key={index}>{`${tkt.sn} - ${tkt.subject}`}</div>;
                  })} */}
                  <div className="text-lg"><strong>{`${sameCreatorTickets[1]?.sn} - `}</strong>{`${sameCreatorTickets[1]?.subject}`}</div>
                  <div className="text-[#f21300] text-sm font-medium">{formatDate(sameCreatorTickets[1]?.updatedAt)}</div>
                </div>
                <div className="flex gap-2">
                <div className="flex justify-center items-center">
              {(sameCreatorTickets[1]?.status === "Open" && (
                <div className="bg-[#f21300] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                  Open
                </div>
              )) ||
                (sameCreatorTickets[1]?.status === "Closed" && (
                  <div className="bg-[#008626] text-white rounded-full h-4 w-12 flex justify-center items-center text-xs">
                    Closed
                  </div>
                )) ||
                (sameCreatorTickets[1]?.status === "New" && (
                  <div className="bg-[#091747] text-white rounded-full h-4 w-10 flex justify-center items-center text-xs">
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
              )
            }
           
          </div>
          <div className="bg-[#E9E9E9] p-2 flex flex-col rounded-xl">
            <div>
              <strong className="text-[13px] text-[#091747] font-poppins font-bold">Ticket Status</strong>
            </div>
            <div className="mt-2 flex items-center gap-2">
              {/* Rounded-xl select component */}
              <select
                className="rounded-lg px-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="New">New</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Save button */}
              <button
                className="bg-[#091747] text-white px-2 py-2 rounded-xl hover:bg-blue-950"
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
