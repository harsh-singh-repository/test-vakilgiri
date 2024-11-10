import { CgProfile } from "react-icons/cg";
import { ImUser } from "react-icons/im";

const ClientCard = () => {

    const clientCardData = [
        {
            logo: <ImUser size={"35"} />,
            title: "All Users",
            value: "19",
            iconBgColor: "bg-gray-500",
            bgColor: "bg-gray-500",
            textColor: "text-white"
        },
        {
            logo: <ImUser size={"35"} />,
            title: "All Users",
            value: "19",
            iconBgColor: "bg-gray-500",
            bgColor: "bg-gray-500",
            textColor: "text-white"
        },
        {
            logo: <ImUser size={"35"} />,
            title: "All Users",
            value: "19",
            iconBgColor: "bg-gray-500",
            bgColor: "bg-gray-500",
            textColor: "text-white"
        },
        {
            logo: <ImUser size={"35"} />,
            title: "All Users",
            value: "19",
            iconBgColor: "bg-gray-500",
            bgColor: "bg-gray-500",
            textColor: "text-white"
        }
    ]

  return (
      <div className="flex justify-between items-start gap-1 rounded-lg p-4 gap-x-4">
        {clientCardData.map((data,index) => {
          return (
              <div className={`w-full flex justify-start items-start border border-gray-300 rounded-lg p-4 ${data.bgColor}`} key={data.title+index}>
                <div className="flex gap-x-2 items-center">
                  <div  className="w-10 h-10 rounded-md flex justify-center items-center bg-white">
                    <span className="text-lg">{data.logo}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-medium text-xs ${data.textColor}`}>{data.value}</span>
                    <span className={`text-lg font-bold ${data.textColor}`}>{data.title}</span>
                  </div>
                </div>
              </div>
          );
        })}

      </div>
  )
}

export default ClientCard