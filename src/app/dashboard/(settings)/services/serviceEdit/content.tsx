import { getSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { Services } from '../types';
import { FormModal } from '../_components/formModal';
import ContentDelete from './contentDelete';
import ContentEdit from './contentEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
interface ContentData {
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
interface ContentProps{
  contentfetch: boolean;
  setContentfetch: React.Dispatch<React.SetStateAction<boolean>>;
  service:Services
}
const Content: React.FC<ContentProps> = ({ contentfetch,setContentfetch, service }) => {
  const [data, setData] = useState<ContentData[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const handleOpenModal = (id: string) => {
    setActiveItemId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveItemId(null);
    setIsModalOpen(false);
  };
  const [isModalOpen1, setIsModalOpen1] = React.useState(false);
  const [activeItemId1, setActiveItemId1] = useState<string | null>(null);
  const handleOpenModal1 = (id: string) => {
    setActiveItemId1(id);
    setIsModalOpen1(true);
  };

  const handleCloseModal1 = () => {
    setActiveItemId1(null);
    setIsModalOpen1(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      try {
        const response = await fetch(`https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/content/${service.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session?.user.accessToken}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          console.log(result);
          setData(result.data);
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contentfetch]);

  type ColumnType = 'Features' | 'Advantage' | 'FAQs' | 'Procedure';
  type TaskType = 'Tasks' | 'Document_Required' | 'Long_Description' | 'Short_Description';

  const column1: Record<ColumnType, ContentData[]> = {
    Features: [],
    Advantage: [],
    FAQs: [],
    Procedure: [],
  };

  const column2: Record<TaskType, ContentData[]> = {
    Tasks: [],
    Document_Required: [],
    Long_Description: [],
    Short_Description: [],
  };

  data.forEach((item) => {
    if (item.type in column1) {
      (column1[item.type as ColumnType] as ContentData[]).push(item);
    }
    if (item.type in column2) {
      (column2[item.type as TaskType] as ContentData[]).push(item);
    }
  });

  const bg = {
    Features: 'bg-gray-100',
    Advantage: 'bg-orange-50',
    FAQs: 'bg-yellow-50',
    Procedure: 'bg-pink-50',
    Tasks: 'bg-teal-50',
    Document_Required: 'bg-white',
    Long_Description: 'bg-white',
    Short_Description: 'bg-white',
  };

  // const handleDelete = (id: string) => {
  //   console.log(`Delete item with ID: ${id}`);
  // };

  const renderColumnItems = (data: Record<string, ContentData[]>) => {
    return Object.keys(data).map((item) => {
      const itemKey = item as keyof typeof data;

      return (
        <div key={item}>
          <div className="bg-blue-950 text-white py-1 px-4 rounded-lg shadow-md mb-2 text-left">
            {item}
          </div>
          <div>
            {data[itemKey].map((contentItem: ContentData, index: number) => (
              <div
                key={contentItem.id}
                className={`${bg[itemKey as keyof typeof bg] || 'bg-gray-100'} p-1 rounded-lg mb-2 shadow-md flex`}
              >
                {
                  contentItem.icon &&  <div className="p-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_ICON_URL}/${data.icon}`}
                    alt={contentItem.title}
                    className="w-10 h-10"
                  />
                </div>
                }
               
                <div className="ml-2 relative w-full">
                  <div className='flex flex-col'>
                  <h3 className="font-semibold text-[13px]">
                    {index + 1}. {contentItem.title}
                  </h3>
                  <p className="text-[12px]">{contentItem.description}</p>
                  <div className="flex gap-1">
                    <p className="text-[12px] font-bold">Priority :</p>
                    <p className="text-[12px]">{contentItem.priority}</p>
                  </div>
                  <div className="absolute bottom-1 right-1 p-0 m-0 flex justify-center space-x-2">
  <button className="text-blue-950 w-4 h-4 flex items-center justify-center" onClick={()=>handleOpenModal1(contentItem.id)}>
    <FaPencilAlt className="w-full h-full" />
  </button>
  
  <button className="text-red-500 w-4 h-4 flex items-center justify-center" onClick={()=>handleOpenModal(contentItem.id)}>
    <FaTrashAlt className="w-full h-full" />
  </button>
</div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>{renderColumnItems(column1)}</div>
      <div>{renderColumnItems(column2)}</div>
      {isModalOpen && activeItemId && (
        <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ContentDelete key={activeItemId} data={data.find((item) => item.id === activeItemId)!} close={handleCloseModal}/>
        </FormModal>
      )}
       {isModalOpen1 && activeItemId1 && (
        <FormModal isOpen={isModalOpen1} onClose={handleCloseModal1}>
          <ContentEdit key={activeItemId1} data={data.find((item) => item.id === activeItemId1)!} close={handleCloseModal1} contentfetch={contentfetch} setContentfetch={setContentfetch}/>
        </FormModal>
      )}
    </div>
  );
}

export default Content