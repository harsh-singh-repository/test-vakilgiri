import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Services } from '../types';
import { MaterialInput } from '@/components/material-input';
import { ImCross } from 'react-icons/im';

const formSchema = z.object({
  fixedType: z.enum(['Government_Fees', 'Module_Fees', 'Professional_Fees'], {
    required_error: 'Fee type is required',
  }),
  priority: z.number().min(1).max(10, 'Priority must be between 1 and 10'),
  relatedService: z.boolean().default(false),
  serviceId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

type FormSchema = z.infer<typeof formSchema>;
interface FixedWiseProps {
  data: Services;
  close:()=>void;
  handleFetch:()=>void;
}
interface dropDownData{
  id:string;
  name:string;
}
const FixedWiseForm: React.FC<FixedWiseProps> = ({ data: serviceData, close,handleFetch }) => {
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [loading,setLoading]=useState<boolean>(false)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedType: 'Government_Fees',
      priority: 1,
      relatedService: false,
      serviceId: '',
      title: '',
      description: '',
    },
  });

  const { watch, setValue } = form;
  const feeType = watch('fixedType');
  const relatedService = watch('relatedService');

  useEffect(() => {
    // Fetch services from API
    const fetchServices = async () => {
      const session = await getSession();
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/service`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
        if (response.data && response.data.data) {
          console.log(response.data)
          setServices(
            response.data.data.map((service:dropDownData) => ({
              id: service.id,
              name: service.name,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    setLoading(true)
    const session=await getSession();
    try {
      // const relatedServiceName = data.relatedService
      //   ? services.find((s) => s.id === data.serviceId)?.name || ''
      //   : '';

      const payload = {
        amount: 1000,
        title: data.title,
        description: data.description,
        fixedType: data.fixedType,
        priority: data.priority,
        relatedServiceId:data.serviceId || '',
        relatedService: data.relatedService,
      };
      console.log(data.serviceId)
      console.log(payload)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/promoters/fixed-wise-fee/${serviceData.id}`,
        {
          amount: 1000,
          title: data.title,
          description: data.description,
          fixedType: data.fixedType,
          priority: data.priority,
          relatedServiceId:data.serviceId || '',
          relatedService: data.relatedService,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    finally{
      handleFetch();
      setLoading(false)
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-80">
      <div className='flex justify-between'>
      <h1 className="font-semibold text-blue-950 text-lg">
        Add {feeType.replace('_', ' ')}
      </h1>
      <button onClick={close} className="text-[#f21300] font-bold bg-white"><ImCross size={14}/></button>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Fee Type */}
          <FormField
            name="fixedType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value as FormSchema['fixedType'])
                    }
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fee Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Government_Fees">
                        Government Fees
                      </SelectItem>
                      <SelectItem value="Module_Fees">Module Fees</SelectItem>
                      <SelectItem value="Professional_Fees">
                        Professional Fees
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10).keys()].map((num) => (
                        <SelectItem key={num + 1} value={(num + 1).toString()}>
                          {num + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Related Service Checkbox */}
          {feeType === 'Module_Fees' && (
            <FormField
              name="relatedService"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value as boolean);
                        setValue('serviceId', '');
                      }}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">
                    Is this module related to any service?
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Related Service Dropdown */}
          {relatedService && (
            <FormField
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Title */}
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaterialInput placeholder="Enter Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className='h-40' placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-red-600 w-full" disabled={loading}>
            {
              loading? "loading...":"create"
            }
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FixedWiseForm;
