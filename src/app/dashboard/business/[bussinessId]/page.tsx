import React from "react";
import BusinessIdCardSection from "../_component/business-id-card";
import BussinessDetailCard from "../_component/BussinessDetailCard";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-[6fr_2fr] gap-x-4 p-5 items-start">
        <BusinessIdCardSection />
        <BussinessDetailCard/>
      </div>
    </>
  );
};

export default page;
