// interface AssignedUser {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     userRoles: string;
//   }

interface ContactPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

interface Manager {
  // Define the structure for the manager if more details are available
  [key: string]: string;
}
  
  export interface LeadGetType{
    id: string;
    businessId: string;
    clientId: string | null;
    conversionDate: string | null;
    email: string;
    existing: boolean;
    firstName: string;
    lastName: string;
    mobile: string;
    service: string;
    state: string;
    status: string | null;
    value: string;
    creatorId: string;
    modifiedAt: string;
    createdAt: string;
    slug: string | null;
    isDisabled: boolean;
    assigned: string[];
  }
  export interface BussinessGetType{
    about: string | null;
    authCapital: string | null;
    businessAddress1: string;
    businessAddress2: string | null;
    businessEmail: string;
    businessLogo: string;
    businessMobile: string;
    businessName: string;
    businessPan: string;
    businessPincode: string;
    businessRegDate: string; // ISO date string
    businessRegNo: string;
    businessStatus: string | null;
    businessType: string;
    businessWebsite: string | null;
    city: string;
    contactPerson: ContactPerson;
    contactPersonId: string;
    createdAt: string; // ISO date string
    createdFromLeadId: string | null;
    creatorId: string;
    fbLink: string | null;
    id: string;
    instaLink: string | null;
    isDisabled: boolean;
    managers: Manager[];
    modifiedAt: string; // ISO date string
    officialEmail: string | null;
    paidUpCapital: string | null;
    pan: string | null;
    panStatus: string | null;
    slug: string | null;
    state: string;
    twitterLink: string | null;
  }
  