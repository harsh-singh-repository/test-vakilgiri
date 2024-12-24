// interface AssignedUser {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     userRoles: string;
//   }
  
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
  