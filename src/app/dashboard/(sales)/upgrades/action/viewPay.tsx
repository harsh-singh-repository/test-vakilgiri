"use client";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";

interface ViewPayProps {
  close: () => void;
}

const ViewPay: React.FC<ViewPayProps> = ({ close }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("method1");

  const paymentMethods = [
    { id: "method1", label: "Debit Card/ Credit Card/ UPI/ NetBanking" },
    { id: "method2", label: "Pay via Wallet: ₹3,406,495.56" },
    { id: "method3", label: "Pay Monthly | No Cost EMI" },
  ];

  return (
    <div className="w-[400px] h-auto p-2 bg-white">
      {/* Header Section */}
      <div className="flex flex-col w-full leading-none">
        <div className="flex justify-between items-center">
          <div className="font-poppins text-[#091747] font-semibold text-[18px]">
            Pay Now | UPG11
          </div>
          <div
            className="p-2 bg-[#091747] rounded-lg text-white cursor-pointer"
            onClick={close}
          >
            <ImCross size={10} />
          </div>
        </div>
        <div className="flex gap-x-0.5 mt-1">
          <label className="text-[#000080] font-poppins text-[11px] font-medium">
            Created on:
          </label>
          <label className="text-[#f21300] font-poppins text-[11px] font-medium">
            07-01-2025 |
          </label>
          <label className="text-[#000080] font-poppins text-[11px] font-medium">
            Created by:
          </label>
          <label className="text-[#f21300] font-poppins text-[11px] font-medium">
            Nahar
          </label>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-3">
        {/* Table Section */}
        <div className="w-full rounded-xl overflow-hidden">
          <div className="flex bg-[#091747] text-white text-[14px] font-poppins font-semibold">
            <div className="w-1/2 py-1.5 px-3">Particulars</div>
            <div className="w-1/4 py-1.5 px-3 text-center">Qty</div>
            <div className="w-1/4 py-1.5 px-3 text-center">Amount</div>
          </div>
          <div className="flex text-[#091747] bg-[#EEEEEE] text-[14px] font-poppins font-medium">
            <div className="w-1/2 py-1 px-3">abc</div>
            <div className="w-1/4 py-1 px-3 text-center">1</div>
            <div className="w-1/4 py-1 px-3 text-center">₹1,100.00</div>
          </div>
          <div className="flex text-[#091747] bg-[#EEEEEE] text-[14px] font-poppins font-medium">
            <div className="w-1/2 py-1 px-3">GST @ 18%</div>
            <div className="w-1/4 py-1 px-3 text-center">-</div>
            <div className="w-1/4 py-1 px-3 text-center">₹0.00</div>
          </div>
          <div className="flex bg-[#091747] text-white text-[13px] font-poppins font-semibold">
            <div className="w-3/4 py-1.5 px-3">Grand Total</div>
            <div className="w-1/4 py-1.5 px-3 text-center">₹1,100.00</div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-1">
          <label className="text-[#091747] text-[11px] font-poppins font-semibold">
            Select Payment Method
          </label>
          <div className="mt-0.5 space-y-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center p-2 rounded-md border cursor-pointer ${
                  selectedMethod === method.id
                    ? "bg-[#fde7e7] border-[#f21300]"
                    : "bg-[#f7f7f7] border-gray-300"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <input
                  type="checkbox"
                  name="payment-method"
                  id={method.id}
                  className="form-checkbox accent-[#f21300] focus:ring-[#f21300] cursor-pointer"
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                />
                <label
                  htmlFor={method.id}
                  className={`ml-2 text-[12px] font-semibold font-poppins cursor-pointer${
                    selectedMethod === method.id
                      ? "text-[#f21300]"
                      : "text-[#091747]"
                  }`}
                >
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <div className="mt-1.5">
          <button className="w-full bg-[#f21300] text-white py-2 rounded-md text-[13px] font-semibold">
            Pay ₹1,100.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPay;
