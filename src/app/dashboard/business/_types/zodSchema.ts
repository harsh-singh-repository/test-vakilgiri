import { z } from "zod";

export const businessTypeZodSchema = z.enum(
  [
    "Private_Limited",
    "Proprietorship",
    "Partnership_Firm",
    "LLP",
    "Public_Limited",
    "Micro_Finance",
    "Trust",
    "Society",
    "Section_Eight",
    "Producer_Limited",
    "OPC",
    "Nidhi_Limited",
  ],
  { required_error: "Business type is required" }
);

export const stateZodSchema = z.enum(
  [
    "Arunachal_Pradesh",
    "Andhra_Pradesh",
    "Chhattisgarh",
    "Assam",
    "Bihar",
    "Haryana",
    "Goa",
    "Rajasthan",
    "Uttar_Pradesh",
    "Tamil_Nadu",
    "Others",
    "Gujarat",
  ],
  { required_error: "Select state" }
);

export const panZodSchema = z
  .string()
  .min(1, "PAN is required")
  .transform((value) => value.toUpperCase())
  .refine((value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value), {
    message: "Invalid PAN format",
  });

export const dateZodSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD");

export const AddBussinessformSchema = z.object({
  businessType: z.enum([
    "Choose Bussiness Type",
    "Private_Limited",
    "Proprietorship",
    "Partnership_Firm",
    "LLP",
    "Public_Limited",
    "Micro_Finance",
    "Trust",
    "Society",
    "Section_Eight",
    "Producer_Limited",
    "OPC",
    "Nidhi_Limited",
  ]),
  businessName: z.string().min(1, "Business name is required"),
  businessRegNo: z.string().min(1, "CIN/Reg no. is required"),
  businessRegDate: z.string().min(1, "Date is Required"),
  businessPan: z.string().min(10, "PAN Card must be 10 characters").max(10),
  businessMobile: z
    .string()
    .min(10, "Official number must be 10 digits")
    .max(10),
  state: stateZodSchema.optional(),
  businessAddress1: z.string().min(1, "Registered address is required"),
  businessAddress2: z
    .string()
    .min(1, "Registered address is required")
    .optional(),
  city: z.string().min(1, "City is required"),
  businessPincode: z
  .string()
  .regex(/^\d{6}$/, "Invalid pincode")
  .default(""),
  businessEmail: z.string().min(1, "Enter EmailId"),
  business_logo: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB",
    })
    .optional()
    .nullable(),
  about: z.string().min(1, "About the business is required"),
  terms_conditions: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// const BusinessTypeEnum = z.enum(["type1", "type2", "type3"]).optional();

export const BussinessIdformSchema = z.object({
  businessType: businessTypeZodSchema.optional(), // Business type is optional during an update

  businessName: z.string().min(1, "Business name is required").optional(), // Optional field but can be provided

  businessRegNo: z
    .string()
    .min(1, "Business registration number is required")
    .optional(), // Optional field

  businessRegDate: dateZodSchema.optional(), // Optional field

  businessMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number") // Validates 10-digit Indian mobile numbers starting with 6-9
    .optional(), // Optional field

  businessEmail: z
    .string()
    .email("Invalid email address") // Validates email format
    .optional(), // Optional field

  businessAddress1: z
    .string()
    .min(1, "Registration address line 1 is required")
    .optional(), // Optional field

  businessAddress2: z.string().optional().default(""), // Optional field

  city: z.string().min(1, "City is required").optional(), // Optional field

  state: stateZodSchema.optional(), // Optional field

  businessPincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode") // Validates 6-digit Indian postal codes
    .optional(), // Optional field

  businessPan: panZodSchema.optional(),
  // businessLogo: z.instanceof(File).optional(), // Optional file upload for logo

  about: z.string().min(1, "Business about is required").optional(), // Optional field for business description
});

export const discussionSchema = z.object({
  discussion: z.string().min(1, "Discussion is required"),
});

export const reminderSchema = z.object({
  reminderType: z.enum(["Call", "Follow_Up", "WhatsApp", "Email"]),
  dueDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Due date must be in the format 'yyyy-MM-dd'."
    ),
  subject: z.string().min(1, "Subject is required."),
  body: z.string().min(1, "Body is required."),
});
