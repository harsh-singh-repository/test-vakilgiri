"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Upload } from "lucide-react";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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

export function DialogDemo() {
  const [Debit, setDebit] = useState<boolean>(true);
  const [payDirect, setPayDirect] = useState<boolean>(false);
  const [alreadyPaid, setAlreadyPaid] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onDebit = () => {
    setDebit(true);
    setPayDirect(false);
    setAlreadyPaid(false);
  };

  const onPayDirect = () => {
    setDebit(false);
    setPayDirect(true);
    setAlreadyPaid(false);
  };

  const onAlreadyPaid = () => {
    setDebit(false);
    setPayDirect(false);
    setAlreadyPaid(true);
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

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="flex flex-col justify-center items-center">
        <DialogTitle>Add Wallet Balance</DialogTitle>
        <DialogDescription className="text-[#F20101]">
          Topup your Wallet Balance
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-1">
        <span className="text-[#091747] text-xs font-semibold">
          Select payment Method
        </span>
        <RadioGroup defaultValue="default" className="flex flex-col">
          <div className="flex items-center  space-x-2">
            <RadioGroupItem value="default" id="r1" onClick={onDebit}/>
            <Label htmlFor="r1">Debit/Credit Card, Netbanking and more</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" onClick={onPayDirect}/>
            <Label htmlFor="r2">Pay Directly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" onClick={onAlreadyPaid}/>
            <Label htmlFor="r3">Already Paid? Create a transaction.</Label>
          </div>
          {Debit && (
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <Label className="text-xs font-semibold text-[#091747]">
                  Enter Amount*
                </Label>
                <Input type="text" placeholder="Enter Amount" />
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

          {payDirect && (
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

              <div className="flex gap-x-4 sm:flex-col flex-col md:flex-row lg:flex-row gap-y-3">
                <Button>Enter Payment Details</Button>
                <Button>Cancel Transaction</Button>
              </div>
            </div>
          )}

          {alreadyPaid && (
            <div className="w-full space-y-4 flex flex-col justify-center">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-xs font-semibold">
                  Enter Amount
                </Label>
                <Input id="amount" placeholder="Enter Amount" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-date" className="text-xs">
                    Payment Date
                  </Label>
                  <Popover>
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
                  </Popover>
                </div>

                <div className="space-y-2">
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

              <div className="space-y-2">
                <Label htmlFor="reference-id" className="text-xs">
                  Reference ID
                </Label>
                <Input id="reference-id" placeholder="Reference ID" />
              </div>

              <div className="space-y-2">
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

              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                Create Payment Request
              </Button>
            </div>
          )}
        </RadioGroup>
      </div>
    </DialogContent>
  );
}
