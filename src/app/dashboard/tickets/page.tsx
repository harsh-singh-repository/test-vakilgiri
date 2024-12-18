"use client";

import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FormModal } from '../(settings)/services/_components/formModal';
import CreateTicketDialog from './_components/addTicket';
import TicketCard from './_components/ticketCard';
import { TicketTable } from './_tableComp/ticketTable';
import { TicketColumns } from './_tableComp/ticketColumn';
import { TicketCategoryColumns } from './_tableComp/categoryColumn';

interface TicketCreator{
  firstName:string;
  lastName:string;
  email:string;
  mobileNumber:string;
  pan:string;
  address1:string;
  address2:string;
  alternateMobileNumber:string;
}
interface Ticket {
  sn:string;
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
  creator:TicketCreator;
  category:TicketCategory;
}

interface TicketsResponse {
  statusCode: number;
  data: Ticket[];
  message: string;
  success: boolean;
  errors: string[];
}

export interface Creator {
  firstName: string;
  lastName: string;
  email: string;
  userRoles: string;
}

// Interface for a Ticket Category
export interface TicketCategory {
  sn:string;
  id: string;
  name: string;
  type: string; // JSON string, e.g., '["business"]'
  createdAt: string; // ISO Date string
  modifiedAt: string; // ISO Date string
  slug: string | null;
  creatorId: string;
  creator: Creator;
}

// Generic API Response Interface
export interface ApiResponse {
  statusCode: number;
  data: TicketCategory[];
  message: string;
  success: boolean;
  errors: string[];
}

async function getTicket(): Promise<TicketsResponse | null> {
  try {
    const session = await getSession();
    const token = session?.user.accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }

    const data: TicketsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return null;
  }
}

export const getTicketCategories = async (): Promise<TicketCategory[]> => {
  try {
    const session=await getSession();
    const token=session?.user.accessToken
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket-category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.data.success) {
      return response.data.data;
    } else {
      console.error('Error fetching ticket categories:', response.data.errors);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [numberTicket, setNumberTicket] = useState<{ New: number; Open: number; Closed: number }>({
    New: 0,
    Open: 0,
    Closed: 0,
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

      const handleOpenModal = () => setIsModalOpen(true);
      const handleCloseModal = () => setIsModalOpen(false);
      const [fetchagain,setFetchagain]=useState(false)
      const handleFetch=()=>{
        setFetchagain(true)
      }
      useEffect(() => {
        async function fetchTickets() {
          try {
            const ticketData = await getTicket();
            if (ticketData?.data) {
              const updatedTicketData = ticketData.data.map((ticket, index) => ({
                ...ticket,
                sn: `TKT${(index + 1).toString().padStart(3, '0')}`, 
              }));
              setTickets(updatedTicketData);
              console.log('Tickets:', ticketData.data);
              const statusCounts = ticketData.data.reduce(
                (acc, ticket) => {
                  if (ticket.status === 'New' || ticket.status === 'Open' || ticket.status === 'Closed') {
                    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
                  }
                  return acc;
                },
                { New: 0, Open: 0, Closed: 0 } 
              );

              setNumberTicket(statusCounts);
              console.log('Tickets:', ticketData.data);
              console.log('NumberTicket:', statusCounts);
            }
          } catch (error) {
            console.error('Failed to fetch tickets:', error);
          }finally{
            setFetchagain(false)
          }
        }

        async function fetchCategories() {
          try {
            const categoryData = await getTicketCategories();
            const updatedCategories = categoryData.map((category, index) => ({
              ...category,
              sn: `TC${(index + 1).toString().padStart(3, '0')}`, 
            }));
            setCategories(updatedCategories);
            console.log('Categories:', categoryData);
          } catch (error) {
            console.error('Failed to fetch categories:', error);
          }finally{
            setFetchagain(false)
          }
        }
        fetchTickets();
        fetchCategories();
      }, [fetchagain]);
  return (
    <div className='p-4'>
      {/* Header */}
      <div className="flex justify-between">
      <div className="text-2xl font-bold text-[#042559]">{`Tickets`}</div>
        <div className="flex gap-2">
        {/* <Input
            placeholder="Type Here..."
            className="w-full md:max-w-sm ml-auto bg-white"
            /> */}
          <div className="bg-[#f21300] text-white p-2 rounded-md cursor-pointer" onClick={handleOpenModal}>
            <FaPlus/>
          </div>
          {isModalOpen && (
            <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <CreateTicketDialog onClose={handleCloseModal} fetchAgain={handleFetch} category={categories}/>
            </FormModal>
          )}
        </div>
      </div>
      <div className='p-2'>
      <TicketCard tickets={numberTicket}/>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 mt-4 gap-2">
  <div className="col-span-3">
  <TicketTable columns={TicketColumns(categories,tickets,handleFetch)} data={tickets} />
  </div>
  <div>
  <TicketTable
        columns={TicketCategoryColumns(handleFetch)}
        data={categories}
      />
  </div>
</div>
    </div>
  );
}

export default Page;