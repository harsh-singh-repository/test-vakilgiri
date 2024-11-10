"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;

const formSchema = z.object({
    businessType: z.enum(["Proprietorship", "Patnership Firm", "Private Limited", "OPC", "LLP", "Public Limited", "Nodhi Limited", "Micro Finance", "Producer Limited", "Trust", "Society", "Section-8"]),
    pan: z.string().min(10, "Pan is too short").max(10, "Pan is too long"),
    businessName: z.string().min(3, "Business Name is too short").max(50, "Business Name is too long"),
    regNo: z.string().min(10, "Reg No is too short").max(10, "Reg No is too long"),
    regDate: z.date(),
    mobNo: z.string().min(10, "Mob No is too short").max(10, "Mob No is too long"),
    email: z.string().email("Invalid email"),
    regAddress1: z.string(),
    regAddress2: z.string(),
    city: z.string(),
    state: z.string(),
    pinCode: z.string().min(6, "Pin Code is too short").max(6, "Pin Code is too long"),
    logo: z.instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB'),
    description: z.string().min(10, "Description is too short").max(100, "Description is too long"),
})


const AddNewBusinessForm = () => {

    const bussinessTypeOptions = [
        {
            value: "proprietorship",
            label: "Proprietorship"
        },
        {
            value: "Patnership Firm",
            label: "Patnership Firm"
        },
        {
            value: "Private Limited",
            label: "Private Limited"
        },
        {
            value: "OPC",
            label: "OPC"
        },
        {
            value: "LLP",
            label: "LLP"
        },
        {
            value: "Public Limited",
            label: "Public Limited"
        },
        {
            value: "Nodhi Limited",
            label: "Nodhi Limited"
        },
        {
            value: "Micro Finance",
            label: "Micro Finance"
        },
        {
            value: "Producer Limited",
            label: "Producer Limited"
        },
        {
            value: "Trust",
            label: "Trust"
        },
        {
            value: "Society",
            label: "Society"
        },
        {
            value: "Section-8",
            label: "Section-8"
        }
    ]

    const selectBusinessTypeOptions = () => {
        return (
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            bussinessTypeOptions.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }

    const formFeilds = [
        {

        }
    ]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default AddNewBusinessForm
