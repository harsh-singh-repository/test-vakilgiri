'use client'
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { CiCirclePlus, CiMenuBurger } from "react-icons/ci";
import { signOut } from "next-auth/react";
// import { RxAvatar } from "react-icons/rx";
import logo from "../../assets/logo.png";
import { DialogDemo } from "./WalletBalanceDialog";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Modal from "@/components/model/custom-modal";
import { TbUserSquare } from "react-icons/tb";
import { getSession } from 'next-auth/react';

type SessionType = {
  user: {
    accessToken?: string;
    lastName?: string;
    firstname?:string,
    email?: string;
  };
};

const Navbar = () => {
  // const [open, setOpen] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [session, setSession] = useState<SessionType | null>(null);

  const handleDashboardClick = () => {
    setPopoverOpen(false);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", // Redirect to the desired page after logout
    });
  };

     
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    // Fetch session details on component mount
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (sessionData?.user?.accessToken) {
        setSession({
          user: {
            accessToken: sessionData.user.accessToken,
            firstname:sessionData.user.firstName,
            lastName: sessionData.user.lastName,
            email: sessionData.user.email,
          },
        });
      }
      // console.log(sessionData);
    };
   
    fetchSession();
  }, []);
 
  return (
    // <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full sticky top-0 bg-white shadow-lg p-2 border-black flex items-center justify-between h-12 z-50">
        <div className="flex justify-center gap-2 items-center">
          <SidebarTrigger>
            <CiMenuBurger />
          </SidebarTrigger>
          <Image src={logo} alt="logo_vakilgiri" height={125} width={125} />
        </div>

        <div className="flex gap-1 justify-center items-center">
          <div className="bg-[#EEEEEE] flex gap-7 text-left py-1 items-center px-2 rounded-sm">
            <div className="flex flex-col h-8">
              <span className="text-[9px] text-[#F20101] font-medium">Wallet Balance</span>
              <span className="text-[14px] font-medium">&#8377; 0.00</span>
            </div>
            {/* <DialogTrigger> */}
              <CiCirclePlus size={"20"} className="text-[#F20101] cursor-pointer" onClick={openModal}/>
            {/* </DialogTrigger> */}
            <Modal isOpen={isModalOpen} onClose={closeModal} className="w-[440px]"> 
               <DialogDemo onClose={closeModal}/>
            </Modal>
          </div>
          <div>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger>
                <FaRegCircleUser size={40} className="text-slate-700 shadow-sm shadoe-slate-300 rounded-full mt-1 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-full px-[10px] py-[15px] bg-[#ffffff] rounded-[10px] mt-2 ml-2">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <div className="w-full flex gap-1 items-start justify-start">
                    <FaRegCircleUser size={60} className="mt-2 text-slate-700 shadow-sm shadoe-slate-300" />
                    <div className="flex flex-col">
                      <p className="text-[16px] font-bold text-[#F20101]">{session?.user.firstname + " " + session?.user.lastName}</p>
                      <div className="flex items-center gap-1 m-0">
                        <span className="text-[#F20101] text-[13px] font-bold">[E]:</span>
                        <p className="text-[13px] break-all font-medium">{session?.user.email}</p>
                      </div>
                      <div className="flex items-center gap-1 m-0">
                        <span className="text-[#F20101] text-[13px] font-bold">[P]:</span>
                        <p className="text-[13px] font-medium">775533664411</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 justify-around items-center">
                    <Button 
                      className="w-[150px] text-[15px] font-[600] bg-[#F20101] hover:bg-[#F20101]/70 text-white"
                      onClick={handleDashboardClick}
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button className="w-[150px] text-[15px] font-[600] bg-[#091747] hover:bg-[#F20101] text-white" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    // </Dialog>
  );
};

export default Navbar;
