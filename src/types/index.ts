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

export interface EstimateProps{
    date: string;
    estimateId: string;
    business: string;
    state: string;
    quotations: string;
    payments: string;
    dueAmount: string;
    status: string;
    action: string;
}

export interface GetClinet{
  aadhaar: string;
  address1: string;
  address2: string;
  alternativeMobileNumber: string;
  city: string;
  createdProjects: [];
  email: string;
  emailStatus: string;
  firstName: string;
  id: string;
  lastLogin: string | null;
  lastName: string;
  loginStatus: string;
  managers: [];
  mobileNumber: string;
  pan: string;
  pincode: string;
  userRoles: string;
  walletAmount: number;
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
  address1?:string;
  address2?:string;
  city?:string;
  pincode?:string;
}

export interface StaffDataTypes{
  firstName: string; // Required, at least 1 character
  lastName: string; // Required, at least 1 character
  email: string; // Must be a valid email
  mobileNumber: string; // Must be exactly 10 digits
  pan: string; // Must match PAN format: 5 uppercase letters, 4 digits, 1 uppercase letter
  dob: string; // Matches the type of dateZodSchema
  aadhaar: string; // Must be exactly 12 digits
  gender: "Male" | "Female" | "Other"; // Enum for gender
  state: string; // Matches the type of stateZodSchema
  address1: string; // Required, at least 1 character
  address2?: string; // Optional
  city: string; // Required, at least 1 character
  pincode: string; // Must be exactly 6 digits
  userRoles: "Client" | "Staff_Manager" | "Admin"; // Enum for user roles
  loginStatus: "None" | "Active" | "Inactive"; // Enum for login status
}
export interface GetPaymentsInterface{
  invoiceId: string | null;
  amount: number;
  approvedById: string | null;
  approvedOn: string;
  businessId: string | null;
  createdAt: string;
  creatorId: string | null;
  customerEmail: string;
  customerMobile: string;
  customerName: string;
  description: string;
  expireBy: string | null;
  id: string;
  paymentMode: string;
  projectId: string | null;
  referenceId: string;
  remarks: string | null;
  screenshot: string;
  shortUrl: string | null;
  slug: string;
  status: string;
  transactionDate: string | null;
  transactionId: string | null;
  transactionMode: string;
  transactionType: string;
  updatedAt: string;
  userWalletId: string | null;
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
  businessWebsite?: string | undefined;
  twitterLink?: string | undefined;
  fbLink?: string | undefined;
  instaLink?: string | undefined;
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
export interface AddFileType{
  businessId:string | string[] | undefined,
  File_Name:string,
  file:File,
  Visibility?: boolean,
}

export interface AddFileTypeClient{
  clientId:string | string[] | undefined,
  File_Name:string,
  file:File,
  Visibility?: boolean,
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


export interface UserRegisterType{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  pan: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
