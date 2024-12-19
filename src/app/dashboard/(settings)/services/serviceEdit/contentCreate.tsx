import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Services } from '../types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast"
import { Cross2Icon } from '@radix-ui/react-icons';

const schema = z.object({
  type: z.string().min(1, 'Type is required'),
  priority: z.number().min(1, 'Priority is required').max(10, 'Priority must be between 1 and 10'),
  taskType: z.string().min(1, 'Task type is required'),
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  icon: z
  .custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    "File is required"
  )
  .optional()
});

type FormData = z.infer<typeof schema>;

interface CreateContentProps {
  data: Services;
  close: () => void;
  contentfetch: boolean;
  setContentfetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentCreate: React.FC<CreateContentProps> = ({ data, close,contentfetch,setContentfetch }) => {
    const [loading,setLoading]=useState(false);
    const { toast } = useToast()
    const [selectedType, setSelectedType] = useState<string>('');
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: '',
      priority: 0,
      taskType: '',
      title: '',
      description: '',
      icon: undefined
    },
  });
  const { register, handleSubmit, setValue, formState: { errors } } = form;
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setLoading(true)
    const session = await getSession();
    const token = session?.user.accessToken;
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('type', formData.type);
    formDataToSubmit.append('priority', formData.priority.toString()); // Ensure it's a string
    formDataToSubmit.append('taskType', formData.taskType);
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('serviceId', data.id);
  
    // Check if the file is present and append it
    if (formData.icon && formData.icon.length > 0) {
      formDataToSubmit.append('icon', formData.icon[0]); // Append the first file
    }
  
    try {
      const response = await axios.post(
        'https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/content/',
        formDataToSubmit,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      setLoading(false)
      setContentfetch(!contentfetch)
      toast({
        title: "Successful!",
        description: "Content added Successfully",
      })
      close();
    } catch (error) {
      setLoading(false)
      console.error('Error submitting form:', error);
    }
  };
  const types=[ "Features", "Advantage", "FAQs", "Procedure", "Document_Required", "Long_Description", "Short_Description","Tasks",]
  const tasks=["Admin_Task", "Employee_Task", "Survey_Task"]
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("icon", files); // Update form state
    }
  };
  return (
    <div className="p-4">
      <div className='flex justify-between'>
      <h1 className="font-poppins font-semibold text-xl">{
        selectedType.length>0 ? `Add ${selectedType}` : 'Add'
}</h1>
<button className='text-red-600 font-bold text-lg' onClick={close}><Cross2Icon/></button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-2">
        <div className='grid grid-cols-3'>
        <div className={`${(selectedType==="Features" || selectedType==="Advantage")?"col-span-1":"hidden"}`}>
        <div className="flex justify-center items-center border border-dashed border-gray-400 rounded-md h-20 bg-gray-100 p-4 m-4">
              <label htmlFor="file-upload" className="text-gray-500 text-center cursor-pointer">
                {fileName.slice(0,5) || "Upload"}...
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>
        </div>
        <div className={`${(selectedType==="Features" || selectedType==="Advantage")?"col-span-2 flex flex-col gap-2":"col-span-3 flex flex-col gap-2"}`}>
        <div>
          <Select onValueChange={(value: string) => {
            setValue('type', value)
            setSelectedType(value);
          }}>
            <SelectTrigger className="text-gray-900 placeholder:text-gray-400">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {
                types.map((type,index)=>{
                    return (
                        <SelectItem value={type} key={index}>{type}</SelectItem>
                    )
                })
              }
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Priority Selection */}
        <div>
          <Select onValueChange={(value: string) => setValue('priority', parseInt(value, 10))}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
        </div>

        {/* Task Type */}
        <div>
          <Select onValueChange={(value: string) => setValue('taskType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              {
                tasks.map((task,index)=>{
                    return (
                        <SelectItem value={task} key={index}>{task}</SelectItem>
                    )
                })
              }
            </SelectContent>
          </Select>
          {errors.taskType && <p className="text-red-500 text-sm">{errors.taskType.message}</p>}
        </div>
        </div>
        </div>
        {/* Title */}
        <div>
          <Input type="text" placeholder="Enter title" {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Textarea placeholder="Enter description" {...register('description')} className='h-32'/>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <Button type="submit" className="mt-4 bg-red-600 hover:bg-red-600 h-10" disabled={loading}>
          {
              loading? "loading...":"Save"
          }
        </Button>
      </form>
    </div>
  );
};

export default ContentCreate;
