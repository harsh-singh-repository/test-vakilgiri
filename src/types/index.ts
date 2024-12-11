import { ServicesType } from "@/app/dashboard/(sales)/leads/_types/zodSchema";
import { stateZodSchema } from "@/app/dashboard/business/_types/zodSchema";
import { Icons } from "@/components/icons";
import {z} from "zod";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}


export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  errors: string;
}

export interface CreateClientData {
  First_Name: string;
  Last_Name: string;
  PAN: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  Mobile_Number: string;
  City: string;
  State: string;
  Pincode: string;
  Address_1: string;
  Alternate_Mobile_Number?: string; // Optional
  Address_2?: string; // Optional
  Aadhaar?: string; // Optional
  sendMailToClient: boolean;
}

export interface EditClientData {
  aadhaar?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  pan?: string;
  dob?: string;
  din?: string;
  dscInfo?:"None"|"Not_Applicable" |  "With_Vakilgiri" | "With_Client"
  email?: string;
  gender?: "Male" | "Female" | "Other";
  kycStatus?: "Pending" | "Completed" | "Rejected";
  loginStatus?: "Active" | "Inactive";
}

export interface CreateBussiness{
  business_type: string;
  business_name: string;
  business_reg_no: string;
  business_reg_date: string;
  business_pan: string;
  business_mobile: string;
  state: string;
  business_address_1: string;
  business_address_2?: string;
  city: string;
  business_pincode: string;
  business_email: string;
  business_logo?: File | null;
  about: string;
  terms_conditions: boolean;
}
export interface editBussinessDetails{
  businessType?: string | undefined;
  businessName?: string;
  businessRegNo?: string;
  businessRegDate?: string;
  businessPan?: string;
  businessMobile?: string;
  state?: string;
  businessAddress1?: string;
  businessAddress2?: string;
  city?: string;
  businessPincode?: string;
  businessEmail?: string;
  businessLogo?: File | null;
  about?: string;
}
export interface updateleadDetails{
  firstName?:string,
  lastName?:string,
  mobile?:string,
  email?:string,
  value?:string,
  status?: string;
}

export interface BussinessReminderTypes{
  reminderType: 'Call' | 'Follow_Up' | 'WhatsApp' | 'Email';
  dueDate: string; // Format: 'dd-MM-yyyy'
  subject: string;
  body: string;
}

export interface ClientReminderTypes{
  reminderType: 'Call' | 'Follow_Up' | 'WhatsApp' | 'Email';
  dueDate?: string; // Format: 'dd-MM-yyyy'
  subject?: string;
  body?: string;
}
export interface LeadsReminderTypes{
  reminderType: 'Call' | 'Follow_Up' | 'WhatsApp' | 'Email';
  dueDate?: string; // Format: 'dd-MM-yyyy'
  subject?: string;
  body?: string;
}
export interface BussinessDiscussionType{
  discussion : string
}

export interface clientDiscussionType{
  discussion : string | undefined;
}

export interface LeadsDiscussionType{
  discussion : string;
}
export interface linkLeadType{
  clientId : string;
}



export interface CreateLeadData{
  existing: boolean;
  state: z.infer<typeof stateZodSchema>;
  mobile: string;
  email: string;
  firstName: string;  
  lastName: string;
  value: string;
  businessId?: string; // Commented fields are made optional
  client?: string;     // Optional and validated elsewhere
  service?: z.infer<typeof ServicesType>; 
}


export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
