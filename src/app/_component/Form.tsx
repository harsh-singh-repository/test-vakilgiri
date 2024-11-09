"use client"

import vakilGiriAuth from "@/app/assets/vakilgiri_auth.png";
import Image from "next/image";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import Regester from "./Regester";

const Form = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [forgetPassword, setForgetPassword] = useState<boolean>(false);
  const [regestration, setRegestration] = useState<boolean>(false);

  const handleForgetPassword = () => {
    setLogin(false);
    setForgetPassword(true);
  };

  const handleBackToLogin = () => {
      setForgetPassword(false);
      setLogin(true);
  };

  const alreadyLogin = () => {
      setRegestration(false);
      setLogin(true);
  };

  const handleRegestration = () => {
    setLogin(false);
    setRegestration(true);
  }


  return (
    <>
      <div className="font-poppins min-h-screen w-full flex justify-center items-center">
        <div className="bg-white h-[28rem]  w-[999.99px] rounded-xl flex justify-center items-center gap-[6.5rem] p-5">
          <div className="md:hidden sm:hidden lg:block xl:block hidden">
            <Image
              src={vakilGiriAuth}
              alt="Example"
              height={1000}
              width={1000}
              />
          </div>

          {login && (
            <Login handleForgetPassword={handleForgetPassword} handleRegestration={handleRegestration}/>
          ) }

          {forgetPassword && 
          (
            <ForgetPassword handleBackToLogin={handleBackToLogin}/>
          )
        }

          {regestration && (
            <Regester alreadyLogin={alreadyLogin}/>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
