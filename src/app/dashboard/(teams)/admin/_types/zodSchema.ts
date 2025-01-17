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

export const stateZodSchema = z.enum([
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
]);

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
  business_type: z.enum([
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
  business_name: z.string().min(1, "Business name is required"),
  business_reg_no: z.string().min(1, "CIN/Reg no. is required"),
  business_reg_date: z.string().min(1, "Date is Required"),
  business_pan: z.string().min(10, "PAN Card must be 10 characters").max(10),
  business_mobile: z
    .string()
    .min(10, "Official number must be 10 digits")
    .max(10),
  state: stateZodSchema,
  business_address_1: z.string().min(1, "Registered address is required"),
  business_address_2: z
    .string()
    .min(1, "Registered address is required")
    .optional(),
  city: z.string().min(1, "City is required"),
  business_pincode: z.string().min(6, "Pin code must be 6 digits").max(6),
  business_email: z.string().min(1, "Enter EmailId"),
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

export const userRegisterByRoleSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email format"),
        mobileNumber: z
            .string()
            .min(10, "Phone number should be at least 10 digits")
            .max(10, "Invalid phone number format"),
        pan: z
            .string()
            .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
        dob: dateZodSchema,
        aadhaar: z
            .string()
            .regex(/^\d{12}$/, "Invalid Aadhaar number"),
        gender: z.enum(["Male", "Female", "Other"]),
        state: stateZodSchema,
        address1: z.string().min(1, "Address 1 is required"),
        address2: z.string().optional(),
        city: z.string().min(1, "City is required"),
        pincode: z
            .string()
            .regex(/^\d{6}$/, "Invalid pincode")
            .min(1, "Pincode is required"),
            userRoles: z.enum(["Client", "Staff_Manager", "Admin","Mediator","Retailer","Professional"]),

        loginStatus : z.enum(["None","Active","Inactive"]),
    })

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
