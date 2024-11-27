import { Icons } from "@/components/icons";

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
  firstName: string;
  lastName: string;
  mobileNumber?: string;
  pan: string;
  dob?: string;
  din?: string;
  dscInfo?:"None"|"Not_Applicable" |  "With_Vakilgiri" | "With_Client"
  email: string;
  gender: "Male" | "Female" | "Other";
  kycStatus: "Pending" | "Completed" | "Rejected";
  loginStatus: "Active" | "Inactive";
}


export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
