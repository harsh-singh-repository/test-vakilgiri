import { Button } from '@/components/ui/button';
import { getSession } from 'next-auth/react';
import React from 'react'

interface content{
    id: string;
  description: string;
  icon: string;
  priority: number;
  serviceId: string;
  taskType: string;
  title: string;
  type: string;
  creatorId: string;
  createdAt: string;
  modifiedAt: string;
  slug: string | null;
}
interface contentDeleteProps{
    data:content;
    close: () => void;
}
const ContentDelete:React.FC<contentDeleteProps>=({data,close})=> {
    console.log(data)
    const handleDelete = async (id: string) => {
        try {
          const session = await getSession();
    
          if (!session?.user?.accessToken) {
            console.error("No access token found. Please log in.");
            return;
          }
    
          const response = await fetch(`https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/content/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${session?.user.accessToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          const result = await response.json();
    
          if (response.ok && result.success) {
            console.log(`Content with ID ${id} deleted successfully.`);
            close(); 
          } else {
            console.error(`Failed to delete content: ${result.message || response.statusText}`);
          }
        } catch (error) {
          console.error("Error during content deletion:", error);
        }
      };
  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
  <img src="/bin.gif" alt="Bin" />
</div>
<h1 className='text-lg font-bold'>Are you sure?</h1>
<p className='text-red-500 font-bold'>You are going to delete {data.type}</p>
<Button className='mt-2 w-32 bg-red-600 p-2 hover:bg-red-600' onClick={()=>handleDelete(data.id)}>Delete</Button>
<Button variant={'outline'} onClick={close} className='mt-2 mb-4'>Cancel</Button>
    </div>
  )
}

export default ContentDelete
