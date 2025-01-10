import React from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import RelatedUpgrades from "./upgradeItem";

interface MainViewProps {
  close: () => void;
}

const MainView: React.FC<MainViewProps> = ({ close }) => {
  return (
    <div className=" p-[15px] space-y-2">
      {/* Header section */}
      <div className="flex justify-between items-center w-[900px]">
        <div className="flex gap-2 items-center">
          <div className="text-[18px] font-poppins text-[#091747] font-semibold">
            Upgrade | UPG11 | 07-01-2025
          </div>
          <div className="flex justify-center items-center rounded-xl text-white bg-[#FA7F14] h-[15px] w-[103px] text-[10px] font-poppins font-medium">
            Pending Payment
          </div>
        </div>
        <div
          className="p-2 bg-[#091747] rounded-lg text-white cursor-pointer"
          onClick={close}
        >
          <ImCross size={10} />
        </div>
      </div>

      {/* Table section */}
      <div className="w-full rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="flex bg-[#091747] text-white text-[14px] font-poppins font-semibold">
          <div className="w-3/12 py-1.5 px-3">Upgrade Details</div>
          <div className="w-1/12 py-1.5 px-3 text-center">SAC</div>
          <div className="w-1/12 py-1.5 px-3 text-center">Qty</div>
          <div className="w-2/12 py-1.5 px-3 text-center">Rate/Item</div>
          <div className="w-1/12 py-1.5 px-3 text-center">Tax</div>
          <div className="w-2/12 py-1.5 px-3 text-center">Total Amt</div>
          <div className="w-2/12 py-1.5 px-3 text-center">Tax Amt</div>
          <div className="w-2/12 py-1.5 px-3 text-center">Final Amt</div>
        </div>

        {/* Table Rows */}
        <div className="flex text-[#091747] bg-[#EEEEEE] text-[14px] font-poppins font-medium">
          <div className="w-3/12 py-1 px-3">abc</div>
          <div className="w-1/12 py-1 px-3 text-center">12</div>
          <div className="w-1/12 py-1 px-3 text-center">1</div>
          <div className="w-2/12 py-1 px-3 text-center">₹1,100.00</div>
          <div className="w-1/12 py-1 px-3 text-center">
            <input type="checkbox" className="cursor-pointer" />
          </div>
          <div className="w-2/12 py-1 px-3 text-center">₹1,100.00</div>
          <div className="w-2/12 py-1 px-3 text-center">₹0.00</div>
          <div className="w-2/12 py-1 px-3 text-center">₹1,100.00</div>
        </div>

        {/* Footer */}
        <div className="flex bg-[#091747] text-white text-[13px] font-poppins font-semibold">
          <div className="w-10/12 py-1.5 px-3">Total Upgrade Amount</div>
          <div className="w-2/12 py-1.5 px-3 text-center">₹1,100.00</div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {/*Timeline*/}
        <div className="col-span-1 max-w-[287px]">
          <div className="bg-[#091747] text-white text-[12px] h-[26px] font-poppins font-medium p-1 rounded-xl px-3">
            Timeline
          </div>

          {/* Timeline Content */}
          <div className="bg-[#F5F5F5] space-y-1 mt-2 px-3 rounded-xl">
  {/* Timeline Item 1 */}
  <div className="flex items-start">
    <div className="w-2 flex flex-col items-center">
      <div className="bg-green-500 rounded-full h-2 w-2"></div>
      <div className="h-8 border-l-2 border-dashed border-green-500"></div>
    </div>
    <div className="ml-2">
      <div className="text-[#FF0000] text-[10px] font-medium">
        07-01-2025, 4:41 pm
      </div>
      <div className="text-[#091747] text-[12px] font-semibold">
        Created by Nahar Singh{" "}
        <span className="font-medium">Admin</span>
      </div>
    </div>
  </div>

  {/* Timeline Item 2 */}
  <div className="flex items-start">
    <div className="w-2 flex flex-col items-center">
      <div className="bg-green-500 rounded-full h-2 w-2"></div>
      <div className="h-8 border-l-2 border-dashed border-green-500"></div>
    </div>
    <div className="ml-2">
      <div className="text-[#FF0000] text-[10px] font-medium">
        07-01-2025, 5:17 pm
      </div>
      <div className="text-[#091747] text-[12px] font-semibold flex items-center gap-2">
        Approved by Nahar Singh{" "}
        <span className="font-medium">Admin</span>
        <button className="bg-[#FF0000] text-white px-2 py-0.5 rounded-md text-[10px] font-medium">
          Reject
        </button>
      </div>
    </div>
  </div>

  {/* Timeline Item 3 */}
  <div className="flex items-start">
    <div className="w-2 flex flex-col items-center">
      <div className="bg-green-500 rounded-full h-2 w-2"></div>
      <div className="h-8 border-l-2 border-dashed border-green-500"></div>
    </div>
    <div className="ml-2">
      <div className="text-[#FF0000] text-[10px] font-medium">
        07-01-2025, 5:17 pm
      </div>
      <div className="text-[#091747] text-[12px] font-semibold">
        Pending for Payment -{" "}
        <span className="font-medium">E/Jan25/238</span>
      </div>
    </div>
  </div>

  {/* Timeline Item 4 */}
  <div className="flex items-start">
    <div className="w-2 flex flex-col items-center">
      <div className="bg-red-500 rounded-full h-2 w-2"></div>
    </div>
    <div className="ml-2">
      <div className="text-[#FF0000] text-[10px] font-medium">
        Pending
      </div>
      <div className="text-[#091747] text-[12px] font-semibold">
        Paid on -<br />
        Mode: <br />
        Amount:
      </div>
    </div>
  </div>
</div>


        </div>
        
        {/*Project detail*/}
      <div className="col-span-1 max-w-[287px]">
      <div className="bg-[#091747] text-white text-[12px] h-[26px] rounded-xl font-poppins font-medium p-2 px-4 flex justify-between items-center">
  <span>Project Details</span>
  <div className="bg-[#C4C4C4] text-[10px] text-white font-medium px-2 rounded-full">
    New
  </div>
</div>

{/* Content */}
<div className="bg-[#F5F5F5] p-2 text-[12px] rounded-xl font-poppins space-y-1 mt-2">
  {/* Business Info */}
  <div>
    <span className="font-semibold text-[#091747]">Business:</span>{" "}
    <span className="font-bold text-[#FF0000]">BUZI</span> |{" "}
    <span className="text-[#091747] font-medium">
      VAKILGIRI LEGTECH (INDIA) PRIVATE LIMITED
    </span>
  </div>

  {/* Project Info */}
  <div>
    <span className="font-semibold text-[#091747]">Project:</span>{" "}
    <span className="font-bold text-[#FF0000]">P163</span> |{" "}
    <span className="text-[#091747] font-medium">
      Producer Ltd Registration
    </span>
  </div>

  {/* Estimates Info */}
  <div>
    <span className="font-semibold text-[#091747]">Estimates:</span>{" "}
    <span className="text-[#FF0000] font-medium">E/Jan25/238</span> |{" "}
    <span className="text-[#091747] font-medium">Received</span>{" "}
    <span className="font-bold text-[#FF0000]">₹14,290.00</span>{" "}
    <span className="text-[#091747] font-medium">/</span>{" "}
    <span className="font-bold text-[#091747]">₹15,390.00</span>
  </div>

  {/* Tasks */}
  <div className="text-[#091747] font-semibold">Project Tasks:</div>
</div>

      </div>
      
      <div className="col-span-1 max-w-[287px]">
        <div className="flex flex-col gap-2">
        <div className="w-full bg-[#F5F5F5] rounded-lg p-1 justify-center">
          <div className="text-[#091747] font-bold text-[14px]">Manager</div>

{/* Add Icon */}
<div className="ml-2 flex items-center">
  <div className="border-dashed border-2 border-gray-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
    <FaPlus className="text-[#FF0000] text-[12px]" />
  </div>
</div>
          </div>

          <div>
            <RelatedUpgrades/>
          </div>
        </div>
         
      </div>


      </div>
    </div>
  );
};

export default MainView;
