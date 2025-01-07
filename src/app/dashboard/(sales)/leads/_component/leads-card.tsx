import { FaUserAlt, FaPhoneAlt, FaHeartbeat, FaBullhorn } from "react-icons/fa";
import { LeadsStats } from "../_types";



// Adjust the type to allow optional keys
type LabelType = { [key: string]: string | undefined };

export default function LeadsCardSection() {
  const stats: LeadsStats = {
    leads: {
      all: 18,
      converted: 2,
      contracted: 1,
    },
    today: {
      converted: 0,
      potential: 0,
      disqualified: 0,
    },
    thisMonth: {
      converted: 0,
      potential: 1,
      disqualified: 0,
    },
    thisYear: {
      converted: 2,
      potential: 0,
      disqualified: 0,
    },
  };

  // Define sections data to map over
  const sections = [
    {
      title: "Leads",
      data: stats.leads,
      labels: { all: "All", converted: "Converted", contracted: "Contracted" },
      icon: <FaUserAlt size={30} />,
      bgColor: "bg-[#EABFFF]",
      iconBgColor: "bg-[#3009494d]",
      iconColor: "text-[#300949]",
      titleBgColor: "bg-[#300949]"
    },
    {
      title: "Today",
      data: stats.today,
      labels: { converted: "Converted", potential: "Potential", disqualified: "Disqualified" },
      icon: <FaPhoneAlt size={30} />,
      bgColor: "bg-[#C0F0FF]",
      iconBgColor: "bg-[#093a494d]",
      iconColor: "text-[#093a49]",
      titleBgColor: "bg-[#093a49]"
    },
    {
      title: "This Month",
      data: stats.thisMonth,
      labels: { converted: "Converted", potential: "Potential", disqualified: "Disqualified" },
      icon: <FaHeartbeat size={30} />,
      bgColor: "bg-[#def9b9]",
      iconBgColor: "bg-[#007b234d]",
      iconColor: "text-[#007b23]",
      titleBgColor: "bg-[#007b23]",
    },
    {
      title: "This Year",
      data: stats.thisYear,
      labels: { converted: "Converted", potential: "Potential", disqualified: "Disqualified" },
      icon: <FaBullhorn size={30} />,
      bgColor: "bg-[#ccd7ff]",
      iconBgColor: "bg-[#0917c84d]",
      iconColor: "text-[#091747]",
      titleBgColor: "bg-[#091747]"
    },
  ];

  // Helper function to render key-value pairs
  const renderStatItems = (statObj: { [key: string]: number }, label: LabelType) => {
    return Object.entries(statObj).map(([key, value]) => (
      <div className="flex flex-col justify-center items-center" key={key}>
        <span className="font-medium text-xl text-black">{value}</span>
        <span className="text-xs font-semibold lg:text-nowrap">{label[key] ?? ""}</span>
      </div>
    ));
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex justify-start items-center border border-gray-300 rounded-xl shadow-md ${section.bgColor}`}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center gap-x-2 items-center p-2">
              <div className={`w-14 h-12 rounded-2xl flex justify-center items-center ${section.iconBgColor}`}>
                <span className={`text-xl ${section.iconColor}`}>{section.icon}</span>
              </div>
              <div className="w-full flex justify-between items-center gap-1">
                {renderStatItems(section.data, section.labels)}
              </div>
            </div>
            <div className={`w-full ${section.titleBgColor} text-white rounded-b-xl text-center text-xs`}>
              {section.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
