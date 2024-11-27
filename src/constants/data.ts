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
  id: number;
  profileImage: string;
  companyName: string;
  name: string;
  registration: string;
  doi: string;
  estimates: string;
  projects: string;
  manager: string;
  status: string;
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
