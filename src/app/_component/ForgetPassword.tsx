import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import logo from "@/app/assets/logo.png"
import { ChevronLeft } from 'lucide-react';

interface ForgetPasswordProps {
    handleBackToLogin: () => void; // Function type for handling forget password
  }
  
  const ForgetPassword: React.FC<ForgetPasswordProps> = ({
    handleBackToLogin
  })=> {
  return (
    <>
      <div className="text-black flex flex-col justify-center items-center text-center  p-6  w-full">
              <Image
                  src={logo}
                  alt="vakilgiri_logo"
                  height={150}
                  width={150}
                />


                <h1 className="text-black font-bold text-2xl">
                  Reset Password
                </h1>

                <span className="text-[#002537] font-medium text-base">
                  We all forget
                </span>

                <div className="grid w-full max-w-sm items-center gap-1.5 text-left">
                  <Label htmlFor="email">Email ID</Label>
                  <Input type="email" id="email" placeholder="Email" />
                 <Button className="hover:bg-[#091747] bg-[#F20101]">Send Password Reset Link</Button>

                 <div className="flex gap-1 items-center justify-center" onClick={handleBackToLogin}><ChevronLeft/><span className="font-normal text-[#F20101]">Back to Login</span></div>
                </div>
              </div>
    </>
  )
}

export default ForgetPassword