import { AiOutlineCheck } from 'react-icons/ai';
import { FaClock, FaExclamationCircle} from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi2';


const ClientCard = () => {

    const clientCardData = [
        {
            logo: <HiOutlineDocumentText size={"45"} />,
            title: "Total Estimates",
            value: "19",
            iconBgColor: "bg-[#0917c84d]",
            bgColor: "bg-[#ccd7ff]",
            textColor: "text-[#091747]"
        },
        {
            logo: <AiOutlineCheck size={"45"} />,
            title: "Recieved",
            value: "0",
            iconBgColor: "bg-[#007b234d]",
            bgColor: "bg-[#def9b9]",
            textColor: "text-[#007b23]"
        },
        {
            logo:<FaClock size={"45"} />,
            title: "Due amount",
            value: "4",
            iconBgColor: "bg-[#b9100033]",
            bgColor: "bg-[#f9e2c6]",
            textColor: "text-[#b91000]"
        },
        {
          logo: <FaExclamationCircle size={"45"} />,
          title: "Cancelled",
          value: "16",
          iconBgColor: "bg-[#f2130033]",
          bgColor: "bg-[#ffe6e6]",
          textColor: "text-[#f21300]"
        }
    ]

  return (
      <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-between items-start rounded-lg gap-4">
        {clientCardData.map((data,index) => {
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

export default ClientCard