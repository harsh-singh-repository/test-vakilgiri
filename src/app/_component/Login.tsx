import Image from "next/image";
import React from "react";
import logo from "@/app/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
  handleForgetPassword: () => void; // Function type for handling forget password
  handleRegestration: () => void; // Function type for handling registration
}

const Login: React.FC<LoginProps> = ({
  handleForgetPassword,
  handleRegestration,
}) => {
  return (
    <div className="w-full">
      <div className="text-black flex flex-col justify-center items-center text-center  p-6">
        <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />

        <h1 className="text-black font-bold text-2xl">Welcome Back!</h1>
        <span className="text-[#002537] font-medium text-base">
          Please sign-in to your account and start the adventure
        </span>

        <div className="grid w-full max-w-sm items-center gap-1.5 text-left">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
          <span
            className="text-xs text-right font-bold text-[#F20101] cursor-pointer"
            onClick={handleForgetPassword}
          >
            Forget password?
          </span>
          <div className="text-center font-medium">
            Not an Vakilgiri Client?{" "}
            <span
              className="text-[#F20101] cursor-pointer"
              onClick={handleRegestration}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
