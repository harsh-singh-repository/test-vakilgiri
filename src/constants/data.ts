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
  leadId: number;
  date: string;
  service: string;
  businessOrClient: string;
  companyName: string | null;
  mobile: string;
  value: string;
  assigned: string;
  convertedOn: string | null;
  status: string;
};
