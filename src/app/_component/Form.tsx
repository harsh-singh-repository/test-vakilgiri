"use client";

import vakilGiriAuth from "@/app/assets/vakilgiri_auth.png";
import Image from "next/image";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";

import vakilGiriAuth from "@/app/assets/vakilgiri_auth.png";

const Form = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [registration, setRegistration] = useState<boolean>(false);
  const [forgetPassword, setForgetPassword] = useState<boolean>(false);

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
  };

  return (
      <div className="font-poppins min-h-screen w-full flex justify-center items-center">
        <div className="bg-white h-full min-h-[23rem] w-full lg:w-[1000px] rounded-2xl flex justify-center items-center">
          <div className="lg:block hidden">
            <Image
              src={vakilGiriAuth}
              alt="Example"
              height={1140}
              width={1240}
              />
          </div>

          {login && (
            <Login
              handleForgetPassword={handleForgetPassword}
              handleRegistration={handleRegistration}
            />
          )}

          {forgetPassword && (
            <ForgetPassword handleBackToLogin={handleBackToLogin} />
          )}

          {registration && <Register alreadyLogin={alreadyLogin} />}
        </div>
      </div>
  );
};

export default Form;
