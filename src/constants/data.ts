// import { NavItem } from '@/types';

export type Client = {
  id: number;
  profileImage: string;
  cltid: string;
  firstName: string;
  lastName:string;
  pan: string;
  bussinesses: string;
  projects: string;
  wallet: string;
  manager: string;
  kyc: string;
};

export type Business = {
  id: string;
  about: string;
  authCapital: string | null;
  businessAddress1: string;
  businessAddress2: string | null;
  businessLogo: string;
  businessMobile: string;
  businessEmail: string;
  businessName: string;
  businessPan: string;
  businessPincode: string;
  businessRegDate: string; // ISO date string
  businessRegNo: string;
  businessStatus: string | null;
  businessType: "Private_Limited" | "Public_Limited" | "Sole_Proprietorship" | string;
  businessWebsite: string | null;
  city: string;
  contactPersonId: string | null;
  createdFromLeadId: string | null;
  fbLink: string | null;
  instaLink: string | null;
  officialEmail: string | null;
  paidUpCapital: string | null;
  panStatus: string | null;
  state: string;
  twitterLink: string | null;
  creatorId: string;
  modifiedAt: string; // ISO date string
  createdAt: string; // ISO date string
  slug: string | null;
  isDisabled: boolean;
};


export type Leads = {
    id: string;
    businessId: string | null;
    clientId: string | null;
    conversionDate: string | null;
    email: string;
    existing: boolean;
    firstName: string;
    lastName: string;
    mobile: string;
    service: string | null;
    state: string;
    status: string | null;
    value: string;
    creatorId: string;
    modifiedAt: string;
    createdAt: string;
    slug: string | null;
    isDisabled: boolean;
};

export interface Reminder {
  id: string; // Unique identifier for the reminder
  body: string; // The main content of the reminder
  clientId: string | null; // Associated client ID, if any
  dueDate: string; // ISO date string for the due date
  leadId: string | null; // Associated lead ID, if any
  businessId: string; // Associated business ID
  projectId: string | null; // Associated project ID, if any
  reminderType: string; // Type of reminder (e.g., Call, Email, etc.)
  reply: string | null; // Reply content, if any
  replyDate: string | null; // ISO date string for the reply date
  status: string | null; // Current status of the reminder
  subject: string; // Subject of the reminder
  creatorId: string; // ID of the user who created the reminder
  modifiedAt: string; // ISO date string for the last modification date
  createdAt: string; // ISO date string for the creation date
  slug: string | null; // Slug for the reminder, if applicable
  isDisabled: boolean; // Indicates if the reminder is disabled
  userId: string | null; // Associated user ID, if any
  type: string | null; // Type of reminder context
}
