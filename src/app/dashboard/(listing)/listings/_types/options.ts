import { z } from "zod"

export const directorFormSchema = z.object({
  pan: z.string().min(10, "PAN must be 10 characters").max(10),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  emailId: z.string().email("Invalid email address"),
  din: z.string().min(8, "DIN must be 8 characters").max(8),
  shareholding: z.number().min(0, "Must be at least 0").max(100, "Must be at most 100")
})


export const businessFormSchema = z.object({
  businessType: z.string({
    required_error: "Please select a business type",
  }),
  askPrice: z.string().min(1, "Ask price is required"),
  monthlySales: z.string().min(1, "Monthly sales is required"),
  yearlySales: z.string().min(1, "Yearly sales is required"),
  ebitda: z.string().min(1, "EBITDA is required"),
  reasonToSell: z.string().min(10, "Please provide a detailed reason for selling"),
  businessDescription: z.string().min(10, "Please provide a business description"),
  productsServices: z.string().min(10, "Please list your products and services"),
  highlights: z.string().min(10, "Please provide business highlights"),
  objectives: z.string().min(10, "Please provide business objectives"),
  facility: z.string().min(10, "Please describe your facility"),
  funding: z.string().min(10, "Please provide funding details"),
})

export type BusinessFormData = z.infer<typeof businessFormSchema>


export type DirectorFormValues = z.infer<typeof directorFormSchema>

