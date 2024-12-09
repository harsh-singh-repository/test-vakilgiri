import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverContent,} from "@/components/ui/popover"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

const EditClientPopover = () => {
    
    const [formData, setFormData] = useState({
        firstName: "Harsh",
        lastName: "vadgama",
        mobileNumber: "0966239134",
        email: "paragvadgama1@gmail.com",
        value: "111",
        status: "Contacted",
      })
    
      const handleChange = () => { // if need then add e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        // const { name, value } = e.target
        // setFormData({ ...formData, [name]: value })
        console.log("SUBMITED");
        
      };

      const handleStatusChange = (value: string) => {
        setFormData(prev => ({ ...prev, status: value }))
      }
  return (
    <PopoverContent className="p-4 w-80">
        <div className="text-center font-semibold text-[#1e3a8a] text-[14px] mt-2 mb-2">Edit Lead Details</div>

        <form className="space-y-1">
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-[10px] font-medium text-gray-700">First Name</label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 text-[14px]"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-[10px]  font-medium text-gray-700">Last Name</label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1"
              />
            </div>
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-[10px] font-medium text-gray-700">Mobile Number</label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[10px] font-medium text-gray-700">Email Id</label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="value" className="block text-[10px] font-medium text-gray-700">Value</label>
            <Input
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <Select onValueChange={handleStatusChange} defaultValue={formData.status}>
              <SelectTrigger className="w-full mt-1 border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2">Save</Button>
        </form>
      {/* </CardContent> */}
    {/* </Card> */}
  </PopoverContent>
  )
}

export default EditClientPopover;