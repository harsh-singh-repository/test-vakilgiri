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