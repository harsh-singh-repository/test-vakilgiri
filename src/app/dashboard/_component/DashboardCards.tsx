import { FaUser, FaPhone, FaBuilding, FaProjectDiagram, FaMoneyBill, FaChartLine, FaUniversity, FaHeadset } from "react-icons/fa";

const cardData = [
  {
    icon: <FaUser size={25} />,
    BgColor: "bg-[#EABFFF]",
    iconBgColor: "bg-[#3009494d]",
    iconColor: "text-[#300949]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#300949]",
    footerTitle: "Clients KYC's",
    data: [
      {
        label: "Complete",
        value: "3"
      },
      {
        label: "Incomplete",
        value: "29"
      }
    ]
  },
  {
    icon: <FaPhone size={25} />,
    BgColor: "bg-[#C0F0FF]",
    iconBgColor: "bg-[#0078964d]",
    iconColor: "text-[#093A49]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#093A49]",
    footerTitle: "Leads",
    data: [
      {
        label: "New",
        value: "16"
      },
      {
        label: "Converted",
        value: "2"
      },
      {
        label: "Potential",
        value: "2"
      }
    ]
  },
  {
    icon: <FaBuilding size={25} />,
    BgColor: "bg-[#DEF9BD]",
    iconBgColor: "bg-[#0064004d]",
    iconColor: "text-[#007B23]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#007B23]",
    footerTitle: "Businesses",
    data: [
      {
        label: "New",
        value: "30"
      },
      {
        label: "Verified",
        value: "1"
      },
      {
        label: "Pending",
        value: "1"
      }
    ]
  },
  {
    icon: <FaProjectDiagram size={25} />,
    BgColor: "bg-[#CCD7FF]",
    iconBgColor: "bg-[#00008B4d]",
    iconColor: "text-[#091747]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#091747]",
    footerTitle: "Projects",
    data: [
      {
        label: "New",
        value: "ABC"
      },
      {
        label: "Active",
        value: "ABC"
      },
      {
        label: "Pending",
        value: "ABC"
      }
    ]
  },
  {
    icon: <FaMoneyBill size={25} />,
    BgColor: "bg-[#F9E2C6]",
    iconBgColor: "bg-[#8B45004d]",
    iconColor: "text-[#FE8903]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#FE8903]",
    footerTitle: "Subscriptions",
    data: [
      {
        label: "Active",
        value: "0"
      },
      {
        label: "Expired",
        value: "0"
      },
      {
        label: "10 days",
        value: "0"
      }
    ]
  },
  {
    icon: <FaChartLine size={25} />,
    BgColor: "bg-[#FFCEF2]",
    iconBgColor: "bg-[#8B28504d]",
    iconColor: "text-[#FE01BF]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#FE01BF]",
    footerTitle: "Turnover",
    data: [
      {
        label: "Subscriptions",
        value: "0"
      },
      {
        label: "Gateway",
        value: "ABC"
      }
    ]
  },
  {
    icon: <FaUniversity size={25} />,
    BgColor: "bg-[#E6D2FF]",
    iconBgColor: "bg-[#4B00824d]",
    iconColor: "text-[#7301FE]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#7301FE]",
    footerTitle: "Transactions",
    data: [
      {
        label: "Receipts",
        value: "ABC"
      },
      {
        label: "Expenses",
        value: "ABC"
      }
    ]
  },
  {
    icon: <FaHeadset size={25} />,
    BgColor: "bg-[#FFCFCC]",
    iconBgColor: "bg-[#8B00004d]",
    iconColor: "text-[#f32100]",
    textColor: "text-[#091747]",
    footerBgColor: "bg-[#f32100]",
    footerTitle: "Tickets",
    data: [
      {
        label: "New",
        value: "3"
      },
      {
        label: "Closed",
        value: "2"
      },
      {
        label: "Open",
        value: "0"
      }
    ]
  }
];


const DashboardCard = () => {
  return (
    <div className="p-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cardData.map((card, index) => {
        return (
          <div key={index} className={`w-full h-fit xl:order-1 flex justify-start items-center border border-gray-300 rounded-xl shadow-md shadow-gray-300 ${card.BgColor}`}>
            <div className="w-full h-fit flex flex-col justify-center items-center">
              <div className="w-full h-fit flex justify-center gap-x-2 items-center p-1 px-2">
                <div className={`w-14 h-10 rounded-xl flex justify-center items-center ${card.iconBgColor}`}>
                  <span className={`text-xl ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div className="w-full flex justify-between items-center">
                  {card.data.map((data, dataIndex) => {
                    return (
                      <div className="flex flex-col justify-center items-center gap-x-2" key={data.label + dataIndex}>
                        <span className={`text-[15px] ${card.textColor}`}>{data.value}</span>
                        <span className={`text-[12px] font-[600px] ${card.textColor}`}>{data.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`w-full m-0 text-white font-medium ${card.footerBgColor} text-white rounded-b-xl text-center text-xs py-1`}>
                {card.footerTitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCard;
