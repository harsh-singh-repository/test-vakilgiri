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
