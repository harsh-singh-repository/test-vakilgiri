export type clientIdProps = {
    clientId:string,
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