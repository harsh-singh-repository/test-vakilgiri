export type clientIdProps = {
    clientId:string | string [] | undefined,
}

export interface ClinetBussinessDetails{
    businessName: string; // Name of the business
    businessPan: string;  // PAN of the business
    businessStatus: string | null; // Status of the business, nullable
    businessType: string;  // Type of the business
    id: string;  
}

export interface BusinessDetails {
    id: string;
    about: string | null;
    authCapital: number | null;
    businessAddress1: string;
    businessAddress2: string;
    businessLogo: string;
    businessMobile: string;
    businessEmail: string;
    businessName: string;
    businessPan: string;
    businessPincode: string;
    businessRegDate: string; // ISO Date string
    businessRegNo: string;
    businessStatus: string | null;
    businessType: string;
    businessWebsite: string | null;
    city: string;
    contactPersonId: string | null;
    createdFromLeadId: string | null;
    fbLink: string | null;
    instaLink: string | null;
    officialEmail: string | null;
    paidUpCapital: number | null;
    panStatus: string | null;
    state: string;
    twitterLink: string | null;
    creatorId: string;
    modifiedAt: string; // ISO Date string
    createdAt: string; // ISO Date string
    slug: string | null;
    isDisabled: boolean;
}

export interface clientDisscussionProps{
    body: string;
    businessId: string | null;
    clientId: string;
    createdAt: string; // ISO 8601 format for date-time
    creatorId: string;
    id: string;
    isDisabled: boolean;
    leadId: string | null;
    modifiedAt: string; // ISO 8601 format for date-time
    projectId: string | null;
    reminderId: string | null;
    slug: string | null;
    type: string | null; // Assuming specific types based on `type`
    userId: string | null;
}