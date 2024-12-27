"use client";
import React, { useState } from "react";

function ServiceInfo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeButton, setActiveButton] = useState("Overview");

  const buttons = [
    "Overview",
    "Steps",
    "Features",
    "Documents Required",
    "Registration Includes",
    "FAQs",
  ];

  const buttonContent: Record<string, string> = {
    Overview: "This section provides an overview of the service.",
    Steps: "Here are the steps to follow to complete the process.",
    Features: "Explore the key features of this service.",
    "Documents Required": "List of documents required to proceed.",
    "Registration Includes": "Details about what is included in the registration.",
    FAQs: "Frequently Asked Questions and their answers.",
  };

  const videoId = "GDEAEGrZAI8";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className=" rounded-md">
      {/* YouTube Video */}
      <div className="relative h-50 w-80 aspect-video bg-black rounded-lg overflow-hidden">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            frameBorder="0"
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

      {/* Buttons */}
      <div className="flex flex-wrap mt-4 space-x-2">
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeButton === button
                ? "bg-[#f32100] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveButton(button)}
          >
            {button}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 border rounded-md">
        <p className="text-lg font-medium text-gray-800">
          {buttonContent[activeButton]}
        </p>
      </div>
    </div>
  );
}

export default ServiceInfo;
