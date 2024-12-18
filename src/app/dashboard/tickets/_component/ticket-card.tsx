import { MdHeadsetMic, MdHourglassTop, MdError } from "react-icons/md";
import { TbHeadsetOff } from "react-icons/tb";

const TicketCard = () => {

    const ticketCardData = [
        {
            logo: <MdHeadsetMic size={"45"} />,
            title: "All",
            value: "4",
            iconBgColor: "bg-[#0917c84d]",
            bgColor: "bg-[#ccd7ff]",
            textColor: "text-[#091747]"
        },
        {
            logo: <TbHeadsetOff size={"45"} />,
            title: "Closed",
            value: "2",
            iconBgColor: "bg-[#007b234d]",
            bgColor: "bg-[#def9b9]",
            textColor: "text-[#007b23]"
        },
        {
            logo: <MdHourglassTop size={"45"} />,
            title: "New",
            value: "1",
            iconBgColor: "bg-[#00000055]",
            bgColor: "bg-[#BDBDBD]",
            textColor: "text-[#000000]"
        },
        {
          logo: <MdError size={"45"} />,
          title: "Open",
          value: "1",
          iconBgColor: "bg-[#f2130033]",
          bgColor: "bg-[#ffe6e6]",
          textColor: "text-[#f21300]"
        }
    ]

  return (
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 justify-between items-start rounded-lg gap-4">
        {ticketCardData.map((data,index) => {
          return (
              <div className={`w-full flex justify-start items-start border border-gray-300 rounded-xl p-2 shadow-md shadow-gray-300 ${data.bgColor}`} key={data.title+index}>
                <div className="flex gap-x-2 items-center">
                  <div  className={`w-14 h-14 rounded-2xl flex justify-center items-center ${data.iconBgColor}`}>
                    <span className={`text-xl ${data.textColor}`}>{data.logo}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-medium text-2xl text-black`}>{data.value}</span>
                    <span className={`text-sm font-semibold ${data.textColor}`}>{data.title}</span>
                  </div>
                </div>
              </div>
          );
        })}

      </div>
  )
}

export default TicketCard