import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Cross2Icon } from '@radix-ui/react-icons';

const schema = z.object({
  priority: z.number().min(1, 'Priority is required').max(10, 'Priority must be between 1 and 10'),
  taskType: z.string().min(1, 'Task type is required'),
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  icon: z
    .custom<FileList>(
      (val) => val instanceof FileList && val.length > 0,
      "File is required"
    )
    .optional(),
});

type FormData = z.infer<typeof schema>;

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

interface ContentEditProps {
  data: content;
  close: () => void;
  contentfetch: boolean;
  setContentfetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentEdit: React.FC<ContentEditProps> = ({ data, close,setContentfetch }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>(data.icon ? data.icon.split('/').pop() || "" : "");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      priority: data.priority,
      taskType: data.taskType,
      title: data.title,
      description: data.description,
      icon: undefined,
    },
  });

  const { register, handleSubmit, setValue, formState: { errors } } = form;

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setLoading(true);
    const session = await getSession();
    const token = session?.user.accessToken;

    if (!token) {
      console.error('No token found');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('priority', formData.priority.toString());
    formDataToSubmit.append('taskType', formData.taskType);
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);

    // Check if the file is present and append it
    if (formData.icon && formData.icon.length > 0) {
      formDataToSubmit.append('icon', formData.icon[0]); // Append the first file
    }

    try {
      const response = await axios.put(
        `https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/content/${data.id}`,
        formDataToSubmit,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      setContentfetch(true)
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      console.error('Error updating content:', error);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("icon", files); // Update form state
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-between'>
      <h1 className="font-poppins font-semibold text-xl">Edit {data.type}</h1>
      <button className='text-red-600 font-bold text-lg' onClick={close}><Cross2Icon/></button>
      </div>
     
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-2">
      <div className="grid grid-cols-3 gap-4">
  {data.icon ? (
    <div className="col-span-1 flex justify-center items-center border border-dashed border-gray-400 rounded-md h-20 bg-gray-100 p-4">
      <label htmlFor="file-upload" className="text-gray-500 text-center cursor-pointer">
        {fileName.slice(0, 5) || "Upload"}...
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </div>
  ) : null}

  <div className={data.icon ? "col-span-2 flex flex-col gap-4" : "col-span-3 flex flex-col gap-4"}>
    {/* Type Field */}
    <div>
      <Input
        type="text"
        value={data.type}
        disabled
        className="bg-gray-100 text-gray-600"
      />
    </div>

    {/* Priority Field */}
    <div>
      <Select
        onValueChange={(value: string) => setValue("priority", parseInt(value, 10))}
        defaultValue={data.priority.toString()}
      >
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
  </div>
</div>

       
       
        {/* Task Type */}
        <div>
          <Select onValueChange={(value: string) => setValue('taskType', value)} defaultValue={data.taskType}>
            <SelectTrigger>
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              {['Admin_Task', 'Employee_Task', 'Survey_Task'].map((task, index) => (
                <SelectItem value={task} key={index}>{task}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.taskType && <p className="text-red-500 text-sm">{errors.taskType.message}</p>}
        </div>

        {/* Title */}
        <div>
          <Input type="text" placeholder={data.title} {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Textarea placeholder={data.description} {...register('description')} className='h-32' />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
       

        <Button type="submit" className="mt-4 bg-red-600 hover:bg-red-700 h-10" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default ContentEdit;
