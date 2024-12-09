import { z } from "zod";

export const BussinessStackformSchema = z.object({
    discussion: z.string().min(1, "Discussion is required"),
    reminderType: z.string().min(1, "Reminder type is required"),
    reminderDate: z.date(),
    reminderSubject: z.string().min(1, "Subject is required"),
    reminderDescription: z.string().min(1, "Description is required"),
  });

const panZodSchema = z
    .string()
    .min(1, "PAN is required")
    .transform((value) => value.toUpperCase())
    .refine(
    (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value),
    { message: "Invalid PAN format" }
)

export  const AddClientformSchema = z.object({
    PAN: panZodSchema, // Transform to uppercase
    First_Name: z.string().min(1, "First name is required"), // Ensures the field is not empty
    Last_Name: z.string().min(1, "Last name is required"),
    Mobile_Number: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number") // Validates 10-digit Indian mobile numbers starting with 6-9
      .min(1, "Mobile number is required"),
    email: z
      .string()
      .email("Invalid email address") // Validates email format
      .min(1, "Email is required"),
    Address_1: z.string().min(1, "Address 1 is required"),
    City: z.string().min(1, "City is required"),
    State: z.string().min(1, "State is required"),
    Pincode: z
      .string()
      .regex(/^\d{6}$/, "Invalid pincode") // Validates 6-digit Indian postal codes
      .min(1, "Pincode is required"),
   
    // Optional fields
    Alternate_Mobile_Number: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid alternate mobile number") // Validates 10-digit Indian mobile numbers starting with 6-9
      .optional()
      .or(z.literal("")),
    Address_2: z.string().optional(),
    Aadhaar: z
      .string()
      .regex(/^\d{12}$/, "Invalid Aadhaar number") // Validates 12-digit Aadhaar numbers
      .optional()
      .or(z.literal("")),
      
    //optional
    gender: z.enum(["Male", "Female", "Other"]),
    loginStatus : z.enum(["None", "Active", "Inactive"]).optional(),
    kycStatus : z.enum(["Approved", "Pending"]).optional(),
    dscInfo : z.enum(["None","Not_Applicable", "With_Vakilgiri", "With_Client"]).optional(),
    dscExpiry : z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD")
    .refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid date" })
    .transform((date) => new Date(date)).optional(),
    dscVault : z.string().optional(),
    // Boolean field for sending email to client, with a default value of `false`
    sendMailToClient: z.boolean().default(false),
  });

  export const AddressformSchema = z.object({
    address1: z.string().min(1, { message: 'This field is mandatory' }),
    address2: z.string().min(1, { message: 'This field is mandatory' }),
    city: z.string().min(1, { message: 'This field is mandatory' }),
    state: z.string().min(1, { message: 'This field is mandatory' }),
    pincode: z.string().regex(/^\d{6}$/, { message: 'Enter a valid 6-digit pincode' }),
  })

  export const PersonalDataformSchema = z.object({
    pan: z.string().min(10, "PAN Card must be 10 characters").default("").optional(),
    firstName: z.string().min(1, "First name is required").default("").optional(),
    lastName: z.string().min(1, "Last name is required").default("").optional(),
    gender: z.enum(["Male", "Female", "Other"]).default("Male").optional(),
    mobileNumber: z.string().min(10, "Mobile number must be 10 digits").default("").optional(),
    aadhaar: z.string().min(12, "Aadhaar number must be 12 digits").default("").optional(),
    din: z.string().default("").optional(),
    dob: z.string().default("").optional(),
    dscInfo: z.enum(["None", "Not_Applicable", "With_Vakilgiri", "With_Client"]).default("Not_Applicable").optional(),
    email: z.string().email("Invalid email address").default("").optional(),
    kycStatus: z.enum(["Pending", "Completed", "Rejected"]).default("Pending").optional(),
    loginStatus: z.enum(["Active", "Inactive"]).default("Active").optional(),
  });

  export const discussionSchema = z.object({
    discussion: z.string().min(1, "Discussion is required"),
  })
  
  export const reminderSchema = z.object({
    reminderType: z.enum(["Call", "Follow_Up", "WhatsApp", "Email"]),
    dueDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Due date must be in the format 'yyyy-MM-dd'."
      ).optional(),
    subject: z.string().min(1, "Subject is required.").optional(),
    body: z.string().min(1, "Body is required.").optional(),
  })