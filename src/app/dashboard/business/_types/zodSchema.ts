import { z } from "zod";

const BusinessTypeEnum = z.enum(["type1", "type2", "type3"]).optional();

export const AddBussinessformSchema = z.object({
  businessType: BusinessTypeEnum.default("type1").optional(),
  businessName: z.string().min(1, "Business name is required"),
  date: z
    .date({
      required_error: "Date is required",
    })
    .nullable(),
  pan: z.string().min(10, "PAN Card must be 10 characters").max(10),
  cinRegNo: z.string().min(1, "CIN/Reg no. is required"),
  officialNumber: z
    .string()
    .min(10, "Official number must be 10 digits")
    .max(10),
  state: z.string().min(1, "State is required"),
  regAddress1: z.string().min(1, "Registered address is required"),
  regAddress2: z.string().min(1, "Registered address is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(6, "Pin code must be 6 digits").max(6),
  email: z.string().min(1, "Enter EmailId"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB",
    })
    .optional()
    .nullable(),
  aboutBusiness: z.string().min(1, "About the business is required"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});


// const BusinessTypeEnum = z.enum(["type1", "type2", "type3"]).optional();

export const BussinessIdformSchema = z.object({
  businessType: BusinessTypeEnum.default("type1").optional(),
  businessName: z.string().min(1, "Business name is required"),
  date: z
    .date({
      required_error: "Date is required",
    })
    .nullable(),
  pan: z.string().min(10, "PAN Card must be 10 characters").max(10),
  cinRegNo: z.string().min(1, "CIN/Reg no. is required"),
  officialNumber: z
    .string()
    .min(10, "Official number must be 10 digits")
    .max(10),
  state: z.string().min(1, "State is required"),
  regAddress1: z.string().min(1, "Registered address is required"),
  regAddress2: z.string().min(1, "Registered address is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(6, "Pin code must be 6 digits").max(6),
  email: z.string().min(1, "Enter EmailId"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB",
    })
    .optional()
    .nullable(),
  aboutBusiness: z.string().min(1, "About the business is required"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});
