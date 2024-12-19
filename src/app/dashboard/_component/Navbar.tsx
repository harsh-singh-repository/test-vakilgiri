'use client'
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { CiCirclePlus, CiMenuBurger } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import logo from "../../assets/logo.png";
import { DialogDemo } from "./WalletBalanceDialog";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";


const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  // const openPopup = () => {
  //   return (
  //     <Popover>

  //     </Popover>
  //   )
  // };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full  sticky top-0 bg-white shadow-lg p-2 border-black flex items-center justify-between h-16 z-50">
        <div className="flex justify-center gap-2 items-center">
          <SidebarTrigger>
            <CiMenuBurger />
          </SidebarTrigger>
          <Image src={logo} alt="logo_vakilgiri" height={125} width={125} />
        </div>

        <div className="flex gap-1 justify-center items-center">
          <div className="bg-[#EEEEEE] flex gap-7 text-left py-1 items-center px-2 rounded-sm">
            <div className="flex flex-col">
              <span className="text-[9px] font-medium text-[#F20101]">Wallet Balance</span>
              <span className="text-[14px] font-medium">&#8377; 0.00</span>
            </div>
            <DialogTrigger>
              <CiCirclePlus size={"20"} className="text-[#F20101]" />
            </DialogTrigger>
            <DialogDemo onClose={() => setOpen(false)} />
          </div>
          <div >
          <Popover>
      <PopoverTrigger>
        <RxAvatar size={40} />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="flex flex-col gap-6 items-start justify-center">
          <div className="w-full flex gap-4 items-start justify-start">
            <RxAvatar size={80} className="mt-1" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold text-[#F20101]">Nahar Singh</p>
              <div className="flex items-center gap-2">
                <span className="text-[#F20101] font-medium">[E]:</span>
                <p className="text-sm break-all">naharsingh151299@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F20101] font-medium">[P]:</span>
                <p className="text-sm">775533664411</p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <Button className="w-full bg-[#F20101] hover:bg-[#F20101]/70 text-white font-medium ">
              Dashboard
            </Button>
            <Button className="w-full bg-[#091747] hover:bg-[#F20101] text-white font-medium">
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Navbar;
