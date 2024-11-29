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
      section8: number
      trust: number
      society: number
      micro: number
      producer: number
      proprietor: number
      partnership: number
    }
    status: {
      registered: number
      pending: number
      suspended: number
    }
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