"use client"

import vakilGiriAuth from "@/app/assets/vakilgiri_auth.png";
import Image from "next/image";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";
import Login from "./Login";

const Form = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [forgetPassword, setForgetPassword] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);

  const handleForgetPassword = () => {
    setLogin(false);
    setForgetPassword(true);
  };

  const handleBackToLogin = () => {
      setForgetPassword(false);
      setLogin(true);
  };

  const alreadyLogin = () => {
      setRegistration(false);
      setLogin(true);
  };

  const handleRegistration = () => {
    setLogin(false);
    setRegistration(true);
  }


  return (
    <>
      <div className="font-poppins min-h-screen w-full flex justify-center items-center p-4 lg:p-10">
        <div className="bg-white h-full min-h-[23rem] w-full lg:w-[61rem] rounded-xl flex justify-center items-center">
          <div className="lg:block hidden">
            <Image
              src={vakilGiriAuth}
              alt="Example"
              height={1040}
              width={1200}
              />
          </div>

          {login && (
            <Login handleForgetPassword={handleForgetPassword} handleRegistration={handleRegistration}/>
          ) }

          {forgetPassword && 
          (
            <ForgetPassword handleBackToLogin={handleBackToLogin}/>
          )
        }

          {registration && (
            <Register alreadyLogin={alreadyLogin}/>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
