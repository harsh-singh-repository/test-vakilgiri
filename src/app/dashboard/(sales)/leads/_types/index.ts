export interface LeadsStats {
  leads: {
    all: number;
    converted: number;
    contracted: number;
  };
  today: {
    converted: number;
    potential: number;
    disqualified: number;
  };
  thisMonth: {
    converted: number;
    potential: number;
    disqualified: number;
  };
  thisYear: {
    converted: number;
    potential: number;
    disqualified: number;
  };
}

export interface leadsDisscussionProp{
  disscussion: string;
}

export interface linkClientProp{
  clientId:string
}

export interface LeadsDiscussionType {
  id: string;
  body: string;
  clientId: string | null;
  leadId: string;
  businessId: string | null;
  projectId: string | null;
  reminderId: string | null;
  type: string; // Could be an enum if `type` has limited values
  creatorId: string;
  modifiedAt: string; // Use `Date` if working with date objects
  createdAt: string; // Use `Date` if working with date objects
  slug: string | null;
  userId: string | null;
  isDisabled: boolean;
}

interface Creator {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface managerDetails{
  firstName: string;
  lastName: string;
  email: string;
  userRoles: string;
  id:string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userRoles: string;
}

export interface AdminStaff {
  id: string;
  user: User;
  officialEmail: string | null;
  officialMobile: string | null;
}

export interface Manager {
  id: string;
  managerType: string;
  adminStaff: AdminStaff | null;
  professional: string; // Replace `any` with a specific interface if you know the structure of `professional`
}

export interface LeadsReminderType {
  id: string;
  body: string;
  reminderType: string;
  dueDate: string;
  status: string | null;
  subject: string;
  reply: string | null;
  leadId: string;
  creator: Creator;
  createdAt: string;
}
export interface ClientReminderType {
  id: string;
  body: string;
  reminderType: string;
  dueDate: string;
  status: string | null;
  subject: string;
  reply: string | null;
  leadId: string;
  creator: Creator;
  createdAt: string;
}

export interface bussinessReminderType{
  id: string;
  body: string;
  reminderType: string;
  dueDate: string;
  status: string | null;
  subject: string;
  reply: string | null;
  leadId: string;
  creator: Creator;
  createdAt: string;
}

export interface clientDetailsType{
  aadhaar: string | null;
  address1: string | null;
  address2: string | null;
  alternativeMobileNumber: string | null;
  city: string | null;
  email: string;
  emailStatus: string; // Enum-like restriction for status
  firstName: string;
  id: string;
  lastName: string;
  mobileNumber: string;
  pan: string;
  pincode: string | null;
  userRoles: string| null;
}

interface BusinessUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailStatus: string;
  mobileNumber: string;
  pan: string;
  aadhaar: string | null;
  userRoles: string;
}

export interface BussinessSearchType{
    id: string;
    businessName: string;
    businessPan: string;
    businessUsers: BusinessUser[]
    businessType: string; // Extend as needed
    businessStatus: string | null; // Nullable field
}