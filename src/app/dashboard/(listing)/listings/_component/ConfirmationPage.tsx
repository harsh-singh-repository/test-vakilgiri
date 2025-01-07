"use client"

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import PartyPopper from "@/assets/wired-outline-1103-confetti-in-reveal.json";

interface ConfirmationPageProp {
    setAddListing : React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmationPage = ({setAddListing}:ConfirmationPageProp) => {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full">
        <div className="pt-6 text-center space-y-4">
          <div className="flex justify-center">
                <div className="h-[150px] w-[150px]">
                  <Lottie animationData={PartyPopper}/>
                </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-[17px] font-medium text-[#091747]">
              Congratulations! This Business has been linked successfully.
            </h2>
            <p className="text-[#f21300] text-[13px] font-medium">
              Currently, This Business is under review. We&apos;ll contact you
              once it is verified.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <Button
            variant="destructive"
            className="bg-[#f21300]"
            onClick={()=>setAddListing(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
