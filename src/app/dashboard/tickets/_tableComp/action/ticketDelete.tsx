import { Button } from '@/components/ui/button';
import { getSession } from 'next-auth/react';
import React from 'react'
import { Ticket } from '../ticketColumn';

interface contentDeleteProps{
    data:Ticket;
    close: () => void;
}
const TicketDelete:React.FC<contentDeleteProps>=({data,close})=> {
    console.log(data)
    const handleDelete = async (id: string) => {
        try {
          const session = await getSession();
    
          if (!session?.user?.accessToken) {
            console.error("No access token found. Please log in.");
            return;
          }
    
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${session?.user.accessToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          const result = await response.json();
    
          if (response.ok && result.success) {
            console.log(`ticket with ID ${id} deleted successfully.`);
            close(); 
          } else {
            console.error(`Failed to delete ticket: ${result.message || response.statusText}`);
          }
        } catch (error) {
          console.error("Error during ticket deletion:", error);
        }
      };
  return (
    <div className='flex flex-col justify-center items-center w-xl p-4'>
      <div className='w-xl'>
  <img src="/bin.gif" alt="Bin" />
</div>
<h1 className='text-lg font-bold'>Are you sure?</h1>
<p className='text-red-500 font-bold'>You are going to delete {data.sn}</p>
<Button className='mt-2 w-32 bg-red-600 p-2 hover:bg-red-600' onClick={()=>handleDelete(data.id)}>Delete</Button>
<Button variant={'outline'} onClick={close} className='mt-2 mb-4'>Cancel</Button>
    </div>
  )
}

export default TicketDelete
