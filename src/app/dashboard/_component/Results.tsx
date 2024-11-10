import { CgProfile } from "react-icons/cg";

const Results = () => {

    const DashboardElement = [
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
      <div className="p-5 grid grid-rows-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {DashboardElement.map((element,index) => {
        return (
            <div className="flex flex-col bg-slate-400 p-5 rounded-lg gap-y-3" key={element.name+index}>
              <div className="text-sm font-medium text-white">{element.name}</div>
              <div className="flex gap-5 justify-start items-center">
                <span className="text-lg">{element.logo}</span>
                {element.options.map((option) => (
                  <div  className="flex flex-col text-center justify-center" key={option.value}>
                    <span className="text-xl font-bold">{option.value}</span>
                    <span className="font-medium text-xs">
                      {option.optionName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        );
      })}
    </div>
  )
}

export default Results