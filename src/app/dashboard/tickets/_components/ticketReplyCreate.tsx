import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '../_tableComp/ticketColumn';
import { Input } from '@/components/ui/input';
import { getSession } from 'next-auth/react';
import { toast } from "sonner"

// Zod Schema for form validation
const formSchema = z.object({
    replyBody: z.string().min(10, 'Description must be at least 10 characters long'),
    replyFile: z.instanceof(File).optional(), // Expect a single File object
    ticketId: z.string(),
  });  

// Form Data Type
type FormData = z.infer<typeof formSchema>;

interface TicketReplyCreateProps {
  data: Ticket;
  handleFetchagain:()=>void;
}

const TicketReplyCreate: FC<TicketReplyCreateProps> = ({ data,handleFetchagain }) => {
  // Form Hook with Zod Resolver
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      replyBody: '',
      replyFile: undefined,
      ticketId: data.id.toString(),
    },
  });

  // Form Submit Handler
  const onSubmit = async (formData: FormData) => {
    const session=await getSession();
    const token = session?.user.accessToken
  
    try {
      const formDataPayload = new FormData();
  
      formDataPayload.append('replyBody', formData.replyBody);
      formDataPayload.append('ticketId', formData.ticketId);
      if (formData.replyFile) {
        formDataPayload.append('replyFile', formData.replyFile);
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ticket-reply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token here
        },
        body: formDataPayload, // FormData for file uploads
      });
    console.log(response)
      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
      toast.success('Reply submitted successfully!', {
        description: 'Your reply has been posted successfully.',
      });
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Failed to submit reply', {
        description: 'Please try again later.',
      });
    }finally{
        handleFetchagain();
    }
  };
  

  return (
    <div className="rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Reply Body Input */}
          <FormField
            control={form.control}
            name="replyBody"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Type here..." className='h-32' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Input */}
          <FormField
  name="replyFile"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <label
          htmlFor="file-upload"
          className="relative flex items-center justify-center cursor-pointer rounded-xl bg-[#091747] px-4 py-2 text-white text-sm font-medium hover:bg-blue-800 transition"
          style={{ width: "fit-content" }}
        >
          Upload File
          <Input
            id="file-upload"
            type="file"
            onChange={(e) => field.onChange(e.target.files?.[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>



          {/* Hidden Input for Ticket ID */}
          <Input type="hidden" value={data.id} {...form.register('ticketId')} />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#f21300] hover:bg-red-600">
            Submit Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketReplyCreate;
