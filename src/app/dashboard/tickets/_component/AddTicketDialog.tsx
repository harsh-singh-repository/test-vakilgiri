'use client'

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CreateTicketDialogProps {
  onClose: () => void
}

export default function CreateTicketDialog({ onClose }: CreateTicketDialogProps) {
  return (
    <Card className="w-full max-w-md" >
      <CardHeader className="pb-4 w-full flex flex-row items-center justify-end">
        <CardTitle className="text-2xl text-center flex flex-1 w-full items-center justify-center font-bold text-[#0B1C57]">Create a Ticket</CardTitle>
        <Button
          variant="default"
          size="icon"
          onClick={onClose}
          className="text-white bg-[#0B1C57] ml-auto"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 flex flex-col justify-between items-center md:flex-row">
          <Label htmlFor="email">Email Id</Label>
          <div className='w-full max-w-[250px] flex flex-col justify-center items-end'>
            <Input
              id="email"
              placeholder="Email ID"
              type="email"
              className='w-full' 
            />
            <p className="text-[#f21300] text-xs">No Client found with this Mail ID</p>
          </div>
        </div>

        <div className="space-y-2 flex flex-col justify-between items-center md:flex-row">
          <Label htmlFor="category">Select Category</Label>
          <div className='w-full max-w-[250px]'>
          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Login/ Registration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="login">Login/ Registration</SelectItem>
              <SelectItem value="technical">Technical Support</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>

        <div className="space-y-2 flex flex-col justify-between items-center md:flex-row">
          <Label htmlFor="subject">Subject</Label>
          <div className='w-full max-w-[250px] '>
          <Input
            id="subject"
            placeholder="Enter Subject"
          />
          </div>
        </div>

        <div className="space-y-2 flex flex-col justify-between items-start">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type here..."
            className="min-h-[120px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Supportings</Label>
          </div>
          <div className='w-full max-w-[150px]'>
            <Button className='bg-[#0B1C57] placeholder:text-white text-white hover:bg-[#0B1C57]/90 w-full'>
              <label htmlFor="file-ulabel" className="text-white">Upload a file</label>
              <input id="file-ulabel" type="file" className="hidden" />
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-[#f21300] hover:bg-[#f21300]/90 text-white"
        >
          Create a Ticket
        </Button>
      </CardContent>
    </Card>
  )
}

