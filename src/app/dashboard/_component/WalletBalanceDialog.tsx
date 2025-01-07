"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MaterialInput } from "@/components/material-input";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";
import { Upload } from "lucide-react";

const PaymentDetails = [
  {
    AccountName: "Vakilgiri Legtech (India) Private Limited",
    AccountNumber: "610097769888",
    IFSC: "ICICI006182",
    Bank: "ICICI Bank, Sanjay Place Branch, Agra",
    UPI: "legalcsc@icici",
  },
  {
    AccountName: "Vakilgiri Legtech (India) Private",
    AccountNumber: "610097769888",
    IFSC: "ICICI006182",
    Bank: "ICICI Bank, Sanjay Place Branch, Agra",
    UPI: "legalcsc@icici",
  },
];

export function DialogDemo({ onClose }: { onClose: () => void }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("default");
  const [file, setFile] = React.useState<File | null>(null);
  const [createPayment, setCreatePayment] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handlePaymentDetails = () => {
    setSelectedPaymentMethod("compact");
  };

  return (
    <div className="p-3 w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full relative">Add Wallet Balance <span><ImCross className="absolute h-4 w-4 text-[#f32100] right-3 top-0 cursor-pointer" onClick={onClose}/></span></div>

        <div className="text-[#F20101]">
          Topup your Wallet Balance
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#091747] text-xs font-semibold">
          Select payment Method
        </span>
        <RadioGroup value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange} className="flex flex-col">
          <div className="flex items-center  space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Debit/Credit Card, Netbanking and more</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Pay Directly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Already Paid? Create a transaction.</Label>
          </div>
          {selectedPaymentMethod === "default" && (
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <MaterialInput type="text" placeholder="Enter Amount" />
              </div>
              <Button
                variant={"none"}
                type="submit"
                className="bg-[#F20101] text-white"
              >
                Add Money via Razorpay
              </Button>
            </div>
          )}

          {selectedPaymentMethod === "comfortable" && (
            <div className="flex flex-col gap-2 mt-2 mx-auto">
              {PaymentDetails.map((details) => (
                <div
                  className="flex flex-col bg-[#EEEEEE]"
                  key={details.AccountName}
                >
                  <div className="flex space-x-2 px-2 py-1 flex-col md:flex-row">
                    <span className="text-xs font-bold">A/C Name:</span>
                    <span className="text-xs">{details.AccountName}</span>
                  </div>
                  <div className="flex space-x-2 px-2 flex-wrap flex-col md:flex-row">
                    <span className="text-xs font-bold">A/C Number:</span>
                    <span className="text-xs">{details.AccountNumber}</span>
                  </div>
                  <div className="flex space-x-2 px-2 flex-col md:flex-row">
                    <span className="text-xs font-bold">Bank:</span>
                    <span className="text-xs">{details.Bank}</span>
                  </div>
                  <div className="flex space-x-2 px-2 flex-col md:flex-row">
                    <span className="text-xs font-bold">IFSC:</span>
                    <span className="text-xs">{details.IFSC}</span>
                  </div>
                  <div className="flex space-x-2 px-2 flex-col md:flex-row">
                    <span className="text-xs font-bold">UPI:</span>
                    <span className="text-xs">{details.UPI}</span>
                  </div>
                </div>
              ))}

              <div className="flex gap-x-4 sm:flex-col flex-col md:flex-row lg:flex-row gap-y-3 mt-1">
                <Button
                  className="bg-[#00A12E] hover:bg-[#f23100]"
                  onClick={handlePaymentDetails}
                >Enter Payment Details</Button>
                <Button
                  className="bg-[#f23100] hover:bg-[#f23100]/90"
                  onClick={onClose}
                >
                  Cancel Transaction
                </Button>
              </div>
            </div>
          )}

          {selectedPaymentMethod === "compact" && !createPayment && (
            <div className="w-full space-y-2 flex flex-col justify-center">
              <div className="space-y-2">
                <MaterialInput id="amount" placeholder="Enter Amount" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="payment-date" className="text-xs">
                    Payment Date
                  </Label>
                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="payment-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {date ? date.toDateString() : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover> */}
                  <CustomDatePicker />

                </div>

                <div className="space-y-1">
                  <Label htmlFor="payment-mode" className="text-xs">
                    Payment Mode*
                  </Label>
                  <Select>
                    <SelectTrigger id="payment-mode" className="w-full">
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="cash">CASH</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="neft">NEFT+</SelectItem>
                        <SelectItem value="imps">IMPS</SelectItem>
                        <SelectItem value="qr">QR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <MaterialInput id="reference-id" placeholder="Reference ID" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="account" className="text-xs">
                  Choose Account in which you have transferred
                </Label>
                <Select>
                  <SelectTrigger id="account" className="w-full">
                    <SelectValue placeholder="Mode of Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="account1">Vakilgiri-99732</SelectItem>
                      <SelectItem value="account2">Vakilgiri-933</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleClick}
                  className="w-full bg-slate-300 hover:bg-slate-400"
                  variant="secondary"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Click to upload Payment Screenshot
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {file.name}
                  </p>
                )}
              </div>

              <Button
                className="w-full bg-[#f32100] hover:bg-[#f32100]/90 text-white"
                onClick={() => setCreatePayment(true)}
              >
                Create Payment Request
              </Button>
            </div>
          )}
          {
                createPayment && (
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-[#F32100] p-4 w-fit">
                      <FaCheck className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-[#F32100] text-xl font-semibold">
                        Topup Wallet transaction has been created successfully
                      </h2>
                      <div className="text-sm text-gray-600">
                        Vakilgiri Team is currently reviewing your transaction.
                        <br />
                        Amount will be added in your Wallet once approved.
                      </div>
                    </div>
                    <Button
                      onClick={() => onClose()}
                      className="bg-[#F32100] hover:bg-[#F32100]/90 text-white min-w-[120px]"
                    >
                      Close
                    </Button>
                  </div>
                )
              }
        </RadioGroup>
      </div>
    </div>
  );
}

