import {z} from "zod";

export const ServicesType = z.enum([
  "TwelveA_Prov_Registration", // 12A (Prov) Registration
  "CSR_1_Registration", // CSR-1 Reg.
  "NGO_Darpan_Registration", // NGO Darpan Registration
  "GST_Registration", // GST Registration
  "FCRA_Registration", // FCRA Registration
  "Section_8_Registration", // Section-8 Registration
  "ISO_Certification", // ISO Certification
  "MSME_Udyam_Registration", // MSME/ Udyam Reg.
  "Private_Ltd_Registration", // Private Ltd Registration
  "Public_Ltd_Registration", // Public Ltd Registration
  "Producer_Ltd_Registration", // Producer Ltd Registration
  "LLP_Registration", // LLP Registration
  "DSC_Registration", // DSC Registration
  "Website_Development", // Website Development
  "Website_Renewal", // Website Renewal
  "Import_Export_Registration", // Import Export Reg.
  "Proprietorship_Registration", // Proprietorship Registration
  "Partnership_Registration", // Partnership Registration
  "Micro_Finance_Registration", // Micro Finance Registration
  "EightyG_Prov_Registration", // 80G (Prov) Registration
  "EightyG_Final_Registration", // 80G (Final) Registration
  "TwelveA_Final_Registration", // 12A (Final) Registration
  "Trademark_Registration", // Trademark Registration
  "ITR_Filing", // ITR Filing
]);

export const stateZodSchema = z.enum([
  'Arunachal_Pradesh',
  'Andhra_Pradesh',
  'Chhattisgarh', 
  'Assam',
  'Bihar',
  'Haryana',
  'Goa',
  'Rajasthan',
  'Uttar_Pradesh',
  'Tamil_Nadu',
  'Others',
  ]);

export const states = [
  'Arunachal_Pradesh',
  'Andhra_Pradesh',
  'Chhattisgarh',
  'Assam',
  'Bihar',
  'Haryana',
  'Goa',
  'Rajasthan',
  'Uttar_Pradesh',
  'Tamil_Nadu',
  'Others',
];

export const CreateLeadformSchema = z.object({
    existing: z.boolean().default(true),
    businessId: z.string().min(2, {
      message: "Business name must be at least 2 characters.",
    }).optional(),
    client: z.string({
      required_error: "Please select a contact person",
    }).optional(),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobile: z.string().regex(/^\d{10}$/, {
      message: "Please enter a valid 10-digit mobile number.",
    }),
    state: stateZodSchema,
    service: ServicesType,
    value: z.string().min(1, {
      message: "Please enter a lead value",
    }),
  })

  export const leadsDiscussionSchema = z.object({
    discussion: z.string().min(1, "Discussion is required"),
  });
  
  export const leadsReminderSchema = z.object({
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