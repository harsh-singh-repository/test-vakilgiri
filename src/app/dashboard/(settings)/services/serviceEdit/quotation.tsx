import React from "react";
import { Services } from "../types";
import ServiceFee from "./serviceFee";
import PromoterFee from "./promoterFee";
import CustomFee from "./customFee";
import FixedWiseFee from "./fixedWiseFee";

interface QuotationProps {
  data: Services;
}

const Quotation: React.FC<QuotationProps> = ({ data }) => {
    return (
      <div className="flex flex-col gap-4 ml-2">
        <ServiceFee data={data}/>
        <PromoterFee data={data}/>
        <FixedWiseFee data={data}/>
        <CustomFee/>
      </div>
    );
};

export default Quotation;
