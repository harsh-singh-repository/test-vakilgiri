export interface BusinessStats {
    businesses: {
      all: number
      unverified: number
      forSale: number
    }
    businessTypes: {
      pvtLtd: number
      public: number
      llps: number
      Section_Eight: number
      trust: number
      society: number
      Micro_Finance: number
      Producer_Limited: number
      Proprietorship: number
      Partnership_Firm: number
    }
    status: {
      registered: number
      pending: number
      suspended: number
    }
}

export interface BusinessDiscussion {
  id: string;
  body: string;
  clientId: string | null;
  leadId: string | null;
  businessId: string;
  projectId: string | null;
  reminderId: string | null;
  type: string; // You can narrow this down to specific string literals like 'Business' if applicable
  creatorId: string;
  modifiedAt: string; // Use `Date` if you plan to parse it into a date object
  createdAt: string; // Use `Date` if you plan to parse it into a date object
  slug: string | null;
  userId: string | null;
  isDisabled: boolean;
}

export interface BussinessIdSettingsPageProps{
  bussinessId:string | string[] | undefined;
}

export interface BusinessStatsId {
    businesses: {
      all: number
      unverified: number
      forSale: number
    }
    businessTypes: {
      pvtLtd: number
      public: number
      llps: number
  
    }
    status: {
      registered: number
      pending: number
      suspended: number
    }
}