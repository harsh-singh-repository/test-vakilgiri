import { Building2, Megaphone } from "lucide-react"
import { FaUserAlt } from "react-icons/fa";
import { BusinessStats } from "../_types";



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

  // Helper function to render key-value pairs
  const renderStatItems = (statObj: { [key: string]: number }, label: { [key: string]: string }) => {
    return Object.entries(statObj).map(([key, value]) => (
      <div className="flex flex-col justify-center items-center" key={key}>
        <span className="font-medium text-xl text-black">{value}</span>
        <span className="text-xs font-semibold lg:text-nowrap">{label[key as keyof typeof label]}</span>
      </div>
    ));
  };
  

  const businessLabels = {
    all: "All",
    unverified: "Unverified",
    forSale: "For Sale"
  };

  const businessTypeLabels = {
    pvtLtd: "Pvt Ltd",
    public: "Public",
    llps: "LLPs",
    section8: "Section 8",
    trust: "Trust",
    society: "Society",
    micro: "Micro",
    producer: "Producer",
    proprietor: "Proprietor",
    partnership: "Partnership"
  };

  const statusLabels = {
    registered: "Registered",
    pending: "Pending",
    suspended: "Suspended"
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:flex justify-between items-center gap-4">
      {/* Businesses Section */}
      <div className="w-full xl:order-1 flex justify-start items-center border border-gray-300 rounded-xl shadow-md shadow-gray-300 bg-[#eabfff4d]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center gap-x-2 items-center p-2">
            <div className="w-14 h-12 rounded-2xl flex justify-center items-center bg-[#3009494d]">
              <span className="text-xl text-[#300949]"><FaUserAlt /></span>
            </div>
            <div className="w-full flex justify-between items-center gap-1 text-[#300949]">
              {renderStatItems(stats.businesses, businessLabels)}
            </div>
          </div>
          <div className="w-full m-0 bg-[#300949] text-white rounded-b-xl text-center text-xs">Businesses</div>
        </div>
      </div>

      {/* Business Types Section */}
      <div className="w-full max-w-[600px] flex-shrink-0 md:col-span-2 md:order-2 xl:order-2 justify-start items-center border border-gray-300 rounded-xl shadow-md shadow-gray-300 bg-[#c0f0ff4d]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center gap-x-2 items-center p-2">
            <div className="w-14 h-12 rounded-2xl flex justify-center items-center bg-[#093a494d]">
              <span className="text-xl text-[#093a49]"><Building2 /></span>
            </div>
            <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items- gap-2 text-[#093a49] text-center">
              {renderStatItems(stats.businessTypes, businessTypeLabels)}
            </div>
          </div>
          <div className="w-full m-0 bg-[#093a49] text-white rounded-b-xl text-center text-xs">Business Types</div>
        </div>
      </div>

      {/* Status Section */}
      <div className="w-full xl:order-4 flex justify-start items-center border border-gray-300 rounded-xl shadow-md shadow-gray-300 bg-[#ccd7ff]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center gap-x-2 items-center p-2">
            <div className="w-14 h-12 rounded-2xl flex justify-center items-center bg-[#0917474d]">
              <span className="text-[#091747]"><Megaphone /></span>
            </div>
            <div className="w-full flex justify-between items- gap-1">
              {renderStatItems(stats.status, statusLabels)}
            </div>
          </div>
          <div className="w-full m-0 bg-[#091747] text-white rounded-b-xl text-center text-xs">Status</div>
        </div>
      </div>
    </div>
  );
}