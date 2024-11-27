import { cn } from "@/lib/utils";
import { CgProfile } from "react-icons/cg";

const Results = () => {
  const DashboardElement = [
    {
      name: "Clients KYC's",
      background:"bg-[#EABFFF]",
      bottomBackgrounf:"bg-[#300949]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Leads",
      background:"bg-[#c0f0ff]",
      bottomBackgrounf:"bg-[#093a49]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Bussiness",
      background:"bg-[#def9b9]",
      bottomBackgrounf:"bg-[#007b23]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Projects",
      background:"bg-[#ccd7ff]",
      bottomBackgrounf:"bg-[#091747]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Subscription",
      background:"bg-[#f9e2c6]",
      bottomBackgrounf:"bg-[#fe8903]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Turnover",
      background:"bg-[#ffcef2]",
      bottomBackgrounf:"bg-[#fe01bf]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Transaction",
      background:"bg-[#e6d2ff]",
      bottomBackgrounf:"bg-[#7301fe]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
    {
      name: "Tickets",
      background:"bg-[#ffcfcc]",
      bottomBackgrounf:"bg-[#f21300]",
      logo: <CgProfile size={"30"} />,
      options: [
        {
          optionName: "Complete",
          value: "0",
        },

        {
          optionName: "Incomplete",
          value: "2",
        },
      ],
    },
   
  ];

  return (
    <div className="p-5 grid grid-rows-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {DashboardElement.map((element, index) => {
        return (
          <div
            className={cn("flex flex-col bg-slate-400 pt-2 pb-0 rounded-lg gap-y-3 text-[#091747] shadow-custom",element.background)}
            key={element.name + index}
          >
            <div className="px-5">
              <div className="flex justify-evenly items-center gap-2">
                <span className="text-lg">{element.logo}</span>
                {element.options.map((option) => (
                  <div
                    className="flex flex-col text-center justify-center"
                    key={option.value}
                  >
                    <span className="text-[20px] font-bold">{option.value}</span>
                    <span className="font-medium text-[10px]">
                      {option.optionName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn("rounded-b-lg bg-slate-900 text-center text-white text-[11px] leading-[15.4px]",element.bottomBackgrounf)}>{element.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
