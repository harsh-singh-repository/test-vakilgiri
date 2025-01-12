"use client";
import { ContentData } from "@/app/dashboard/(settings)/services/serviceEdit/content";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface ServiceInfoProps {
  id: string;
  name:string;
}
const ServiceInfo: React.FC<ServiceInfoProps> = ({ id,name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeButton, setActiveButton] = useState("Overview");
  const [serviceId, setServiceId] = useState<string | null>("");
  const [data, setData] = useState<ContentData[]>([]);

  const buttons = [
    "Overview",
    "Steps",
    "Features",
    "Documents Required",
    "Registration Includes",
    "FAQs",
  ];

  const fetchData = async () => {
    if (!id) return;

    const session = await getSession();
    console.log(1)
    try {
      console.log(serviceId)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/content/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        console.log(result);
        setData(result.data);
      } else {
        console.error("Failed to fetch data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const shortDescription = data.find(
    (item) => item.type === "Short_Description"
);
  useEffect(() => {
    const storedServiceId = id;
    setServiceId(storedServiceId);
    console.log("finding data")
    fetchData();
  }, [id]);

  const renderContent = () => {
    const renderGridContent = (items: ContentData[], showIndexAndTitle = false) => {
        return (
            <div className="grid grid-cols-3 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-1 w-fit">
                {items.map((item, index) => (
                    <div
                    key={index}
                    className="p-6 border border-gray-300 rounded-lg bg-red-100 text-center shadow-md"
                >
                    {showIndexAndTitle && (
                        <p className="text-[#091747] font-bold text-[12px] font-poppins">{`STEP-${index + 1}`}</p>
                    )}
                    <p className="text-[#f21300] font-bold text-[15px] font-poppins mb-2">{`${index + 1}. ${item.title}`}</p>
                    <p className="text-[12px] font-poppins text-[#091747]">{item.description}</p>
                </div>
                ))}
            </div>
        );
    };

    const renderListContent = (items: ContentData[]) => {
        return (
            <div className="p-4">
                <p className="mb-2 text-[18px] font-poppins text-[#091747] font-bold">Documents Required:</p>
                <ol className="list-decimal ml-4">
                    {items.map((item, index) => (
                        <li key={index}>{item.description}</li>
                    ))}
                </ol>
            </div>
        );
    };

    switch (activeButton) {
        case "Overview":
            const longDescription = data.find(
                (item) => item.type === "Long_Description"
            );
            return (
                <div className="p-4">
                    <p>{longDescription?.description || "No overview available."}</p>
                </div>
            );

        case "Steps":
            const steps = data.filter((item) => item.type === "Procedure");
            return (
                <div className="">
                    <p className="mb-2 text-[18px] font-poppins text-[#091747] font-bold">Procedure:</p>
                    {renderGridContent(steps, true)}
                </div>
            );

        case "Features":
            const features = data.filter((item) => item.type === "Features");
            return (
              <div className="">
                    <p className="mb-2 text-[18px] font-poppins text-[#091747] font-bold">Features:</p>
                    {renderGridContent(features, true)}
                </div>
            );

        case "Documents Required":
            const documents = data.filter((item) => item.type === "Document_Required");
            return renderListContent(documents);

        case "Registration Includes":
            const advantages = data.filter((item) => item.type === "Advantage");
            return (
              <div className="">
                    <p className="mb-2 text-[18px] font-poppins text-[#091747] font-bold">Registration Includes:</p>
                    {renderGridContent(advantages, true)}
                </div>
            );

        case "FAQs":
            const faqs = data.filter((item) => item.type === "FAQs");
            return (
              <div className="">
                    <p className="mb-2 text-[18px] font-poppins text-[#091747] font-bold">FAQs:</p>
                    {renderGridContent(faqs, true)}
                </div>
            );

        default:
            return <p className="p-4">No content available.</p>;
    }
};
  const videoId = "GDEAEGrZAI8";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="rounded-md max-w-[800px] min-w-[800px]">
      <div className="flex gap-4">
      <div className="relative h-50 w-80 aspect-video bg-black rounded-lg overflow-hidden">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        ) : (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-[#091747] font-medium font-poppins text-[30px]">{name}</h1> 
        <p className="text-[#091747] font-medium font-poppins text-[15px]">{shortDescription?.description}</p>
      </div>
      </div>
      <div className="flex flex-wrap mt-4 gap-2 sm:gap-4">
        {buttons.map((button) => (
          <button
            key={button}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md ${
              activeButton === button
                ? "bg-[#f32100] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-red-100"
            }`}
            onClick={() => setActiveButton(button)}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="mt-4 border rounded-md">{renderContent()}</div>
    </div>
  );
};

export default ServiceInfo;
