import { Building2, Users, Megaphone } from "lucide-react"

interface BusinessStats {
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

export default function BusinessCardSection() {
  const stats: BusinessStats = {
    businesses: {
      all: 25,
      unverified: 22,
      forSale: 1
    },
    businessTypes: {
      pvtLtd: 13,
      public: 0,
      llps: 1,
      section8: 5,
      trust: 1,
      society: 0,
      micro: 1,
      producer: 1,
      proprietor: 1,
      partnership: 0
    },
    status: {
      registered: 22,
      pending: 0,
      suspended: 1
    }
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-4">
      {/* Businesses Section */}
      <div className="rounded-lg bg-purple-100 p-4">
        <div className="flex items-center gap-2 text-purple-900">
          <Users className="h-5 w-5" />
          <h2 className="font-semibold">Businesses</h2>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-900">{stats.businesses.all}</div>
            <div className="text-sm text-purple-700">All</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-900">{stats.businesses.unverified}</div>
            <div className="text-sm text-purple-700">Unverified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-900">{stats.businesses.forSale}</div>
            <div className="text-sm text-purple-700">For Sale</div>
          </div>
        </div>
      </div>

      {/* Business Types Section */}
      <div className="rounded-lg bg-teal-100 p-4 col-span-2">
        <div className="flex items-center gap-2 text-teal-900">
          <Building2 className="h-5 w-5" />
          <h2 className="font-semibold">Business Types</h2>
        </div>
        <div className="mt-2 grid grid-cols-5 text-center text-sm">
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.pvtLtd}</div>
            <div className="text-teal-700">Pvt Ltd</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.public}</div>
            <div className="text-teal-700">Public</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.llps}</div>
            <div className="text-teal-700">LLPs</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.section8}</div>
            <div className="text-teal-700">Section-8</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.trust}</div>
            <div className="text-teal-700">Trust</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.society}</div>
            <div className="text-teal-700">Society</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.micro}</div>
            <div className="text-teal-700">Micro</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.producer}</div>
            <div className="text-teal-700">Producer</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.proprietor}</div>
            <div className="text-teal-700">Proprietor</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-teal-900">{stats.businessTypes.partnership}</div>
            <div className="text-teal-700">Partnership</div>
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="rounded-lg bg-blue-100 p-4">
        <div className="flex items-center gap-2 text-blue-900">
          <Megaphone className="h-5 w-5" />
          <h2 className="font-semibold">By Status</h2>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{stats.status.registered}</div>
            <div className="text-sm text-blue-700">Registered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{stats.status.pending}</div>
            <div className="text-sm text-blue-700">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{stats.status.suspended}</div>
            <div className="text-sm text-blue-700">Suspended</div>
          </div>
        </div>
      </div>
    </div>
  )
}