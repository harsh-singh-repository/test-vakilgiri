import { CgProfile } from "react-icons/cg";

const Results = () => {
  const DashboardElement = [
    {
      name: "Clients KYC's",
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
      name: "Clients KYC's",
      logo: <CgProfile size={"35"} />,
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
            className="flex flex-col bg-slate-400 pt-2 pb-0 rounded-lg gap-y-3"
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
            <div className="rounded-lg bg-slate-900 text-center text-white text-xs">{element.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
