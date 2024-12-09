"use client"

import vakilGiriAuth from "@/app/assets/vakilgiri_auth.png";
import Image from "next/image";
import Reset from "./_component/Reset";

const Form = () => {


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
             <Reset/>
        </div>
      </div>
  );
};

export default Form;
