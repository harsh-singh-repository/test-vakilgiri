import Image from 'next/image';
import React from 'react'
import logo from "@/app/assets/logo.png"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


interface regesterProps {
    alreadyLogin: () => void; // Function type for handling forget password
  }
  
  const Regester: React.FC<regesterProps> = ({
    alreadyLogin
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
                  Welcome to Vakilgiri
                </h1>

                <span className="text-[#002537] font-medium text-base">
                Please register to your account and start the adventure
                </span>

                <div className="grid w-full max-w-sm items-center gap-1.5 text-left">
                  <Input type="email" id="email" placeholder="First Name" />
                  <Input type="email" id="email" placeholder="Last Name" />
                  <Input type="email" id="email" placeholder="Enter Your Email" />
                  <Input type="email" id="email" placeholder="Enter Mobile Number"/>
                  <div className="flex gap-1">
                    <Input type="password" id="password" placeholder="Password"/>
                    <Input type="password" id="confirm password" placeholder="Confirm Password"/>
                  </div>
                 <Button className="hover:bg-[#091747] bg-[#F20101]">Register</Button>

                 <div className="flex gap-1 items-center justify-center">Already a Client?<span className="font-normal text-[#F20101]" onClick={alreadyLogin}>Login</span></div>
                </div>
              </div>
    </>
  )
}

export default Regester;