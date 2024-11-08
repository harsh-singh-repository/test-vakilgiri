import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.png";
import { RxAvatar } from "react-icons/rx";
import { CiCirclePlus } from "react-icons/ci";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CiMenuBurger } from "react-icons/ci";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogDemo } from "./Dialog";

const Navbar = () => {
  return (
    <>
    <Dialog>
      <div className="w-full  sticky top-0 bg-white shadow-lg p-2 border-black flex items-center justify-between h-16 z-50">
        <div className="flex justify-center gap-2 items-center">
            <SidebarTrigger>
               <CiMenuBurger/>
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
              <CiCirclePlus size={"20"} className="text-[#F20101]"/>
            </DialogTrigger>
            <DialogDemo/>
          </div>
          <div className="">
            <RxAvatar size={"40"}/>
          </div>
        </div>
      </div>
      </Dialog>
    </>
  );
};

export default Navbar;
