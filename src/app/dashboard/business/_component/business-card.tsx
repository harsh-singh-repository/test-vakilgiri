"use client";
import { Building2, Megaphone } from "lucide-react"
import { FaUserAlt } from "react-icons/fa";
import { BusinessStats } from "../_types";
import { useGetBussinessCount } from "@/hooks/business/manage-business";
import { useEffect, useState } from "react";



export default function BusinessCardSection() {

   const {data} = useGetBussinessCount();

   console.log("Data Count",data);

    // Initial stats
    const [stats, setStats] = useState<BusinessStats>({
      businesses: {
        all: data?.length,  
        unverified: 22,
        forSale: 1,
      },
      businessTypes: {
        pvtLtd: 0,
        public: 0,
        llps: 0,
        Section_Eight: 0,
        trust: 0,
        society: 0,
        Micro_Finance: 0,
        Producer_Limited: 0,
        Proprietorship: 0,
        Partnership_Firm: 0,
      },
      status: {
        registered: 22,
        pending: 0,
        suspended: 1,
      },
    });
  
    // Mapping API business types to stats keys
    const businessTypeMapping: Record<string, keyof typeof stats.businessTypes> = {
      Private_Limited: "pvtLtd",
      Trust: "trust",
      Public_Limited: "public",
      LLP: "llps",
      Section_Eight: "Section_Eight",
      Society: "society",
      Micro_Finance: "Micro_Finance",
      Producer_Limited: "Producer_Limited",
      Proprietorship: "Proprietorship",
      Partnership_Firm: "Partnership_Firm",
    };
  
    // Update stats dynamically based on API data
    useEffect(() => {
      if (data && Array.isArray(data)) {
        const updatedBusinessTypes = { ...stats.businessTypes };
  
        data.forEach((item) => {
          const key = businessTypeMapping[item.businessType];
          if (key) {
            updatedBusinessTypes[key] = item._count.businessType;
          }
        });
  
        setStats((prev) => ({
          ...prev,
          businessTypes: updatedBusinessTypes,
        }));
      }
    }, [data]);
  
  // Helper function to render key-value pairs

  

  const businessLabels = {
    all: "All",
    unverified: "Unverified",
    forSale: "For Sale"
  };

  const businessTypeLabels = {
    pvtLtd: "Pvt Ltd",
    public: "Public",
    llps: "LLPs",
    Section_Eight: "Section 8",
    trust: "Trust",
    society: "Society",
    Micro_Finance: "Micro",
    Producer_Limited: "Producer",
    Proprietorship: "Proprietor",
    Partnership_Firm: "Partnership"
  };

  const statusLabels = {
    registered: "Registered",
    pending: "Pending",
    suspended: "Suspended"
  };

    const renderStatItems = (statObj: { [key: string]: number }, label: { [key: string]: string }) => {
    return Object.entries(statObj).map(([key, value]) => (
      <div className="flex flex-col justify-center items-center" key={key}>
        <span className="font-medium text-xl text-black">{value}</span>
        <span className="text-xs font-semibold lg:text-nowrap">{label[key as keyof typeof label]}</span>
      </div>
    ));
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