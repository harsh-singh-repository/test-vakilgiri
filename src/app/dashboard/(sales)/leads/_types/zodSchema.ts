import {z} from "zod";

export const CreateLeadformSchema = z.object({
    existingLead: z.string({
      required_error: "Please select if this is an existing lead",
    }),
    businessName: z.string().min(2, {
      message: "Business name must be at least 2 characters.",
    }),
    contactPerson: z.string({
      required_error: "Please select a contact person",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    emailId: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobileNumber: z.string().regex(/^\d{10}$/, {
      message: "Please enter a valid 10-digit mobile number.",
    }),
    state: z.string({
      required_error: "Please select a state",
    }),
    service: z.string({
      required_error: "Please select a service",
    }),
    leadValue: z.string().min(1, {
      message: "Please enter a lead value",
    }),
  })