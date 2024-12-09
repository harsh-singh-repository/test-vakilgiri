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

export interface BussinessSearchType{
    id: string;
    businessName: string;
    businessPan: string;
    businessType: string; // Extend as needed
    businessStatus: string | null; // Nullable field
}