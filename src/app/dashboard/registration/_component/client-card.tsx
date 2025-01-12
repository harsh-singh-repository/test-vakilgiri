"use client"
import { useGetClients } from "@/hooks/clients/manage-client";
import { GetClinet } from "@/types";
import { MdPerson2, MdPeople } from "react-icons/md";
import { MdAddReaction } from "react-icons/md";

const ClientCard = () => {

  const {data} = useGetClients();

  const Inactive = data?.filter((Inactive:GetClinet)=> Inactive.loginStatus === "Inactive");

  const active = data?.filter((active:GetClinet)=> active.loginStatus === "Active");
  
  // console.log("Date", new Date(Date.now()).toISOString())

    const clientCardData = [
        {
            logo: <MdPerson2 size={"45"} />,
            title: "All Users",
            value: data?.length,
            iconBgColor: "bg-[#0917c84d]",
            bgColor: "bg-[#ccd7ff]",
            textColor: "text-[#091747]",
            iconTextColor: "text-[#091747]"
        },
        {
            logo: <MdPeople size={"45"} />,
            title: "Today",
            value: "0",
            iconBgColor: "bg-[#007b234d]",
            bgColor: "bg-[#def9b9]",
            textColor: "text-[#007b23]",
            iconTextColor: "text-[#007b23]"
        },
        {
            logo: <MdAddReaction size={"45"} />,
            title: "Active",
            value: active?.length,
            iconBgColor: "bg-[#b9100033]",
            bgColor: "bg-[#f9e2c6]",
            textColor: "text-[#b91000]",
            iconTextColor:"text-[#F57600]"
        },
        {
          logo: <MdPerson2 size={"45"} />,
          title: "Inactive",
          value: Inactive?.length,
          iconBgColor: "bg-[#f2130033]",
          bgColor: "bg-[#ffe6e6]",
          textColor: "text-[#f21300]",
          iconTextColor: "text-[#f21300]"
        }
    ]

  return (
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 justify-between items-start rounded-lg gap-4  mb-6">
        {clientCardData.map((data,index) => {
          return (
              <div className={`w-full flex justify-start h-[70px] items-start border border-gray-300 rounded-xl p-2 shadow-md shadow-gray-300 ${data.bgColor}`} key={data.title+index}>
                <div className="flex gap-x-2 items-center">
                  <div  className={`w-[50px] h-[50px] rounded-xl flex justify-center items-center ${data.iconBgColor}`}>
                    <span className={`text-[50px] ${data.iconTextColor}`}>{data.logo}</span>
                  </div>
                  <div className="flex flex-col gap-0">
                    <span className={`font-medium text-xl text-black`}>{data.value}</span>
                    <span className={`text-[13px] font-semibold ${data.textColor}`}>{data.title}</span>
                  </div>
                </div>
              </div>
          );
        })}

      </div>
  )
};

export default ClientCard