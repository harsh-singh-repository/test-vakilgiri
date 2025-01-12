"use client";

import logo from "@/app/assets/logo.png";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginProps } from "../_types";
import { LoginformSchema } from "../_types/zodSchema";
import { toast } from "sonner";

// Define schema with gender and birthdate fields
const Login: React.FC<LoginProps> = ({
  handleForgetPassword,
  handleRegistration,
}) => {
  const form = useForm<z.infer<typeof LoginformSchema>>({
    resolver: zodResolver(LoginformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const router = useRouter();
  const [loader, setloader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof LoginformSchema>) {
    setloader(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setloader(false);
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Incorrect Email or password")
      } else {
        toast.error(`Login failed : ${result.error}`)
      }
    }

    if (result?.url) {
      toast.success("Login Successful")
      router.push("/dashboard");
    }
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center w-[48rem] p-4">
      <Image src={logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Welcome Back!</h1>
      <span className="text-[#091747] font-[600] text-[15px]">
        Please sign in to your account and start the adventure
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1.5 text-left"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Email ID
                </FormLabel>
                <Input type="email" placeholder="Enter Email" {...field} />
                <FormMessage />
              </div>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          /> */}

          {/* Submit Button */}
          <Button type="submit" className="hover:bg-[#091747] bg-[#f21300]">
            {
              loader ? <Loader2 className="animate-spin" /> : "Login"
            }
          </Button>

          {/* Forget Password */}
          <div
            className="text-xs w-full text-right font-medium text-[#f21300] cursor-pointer"
            onClick={handleForgetPassword}
          >
            Forget password?
          </div>

          {/* Registration Link */}
          <div className="flex gap-1 items-center justify-center text-[#091747] font-medium">
            Not a Vakilgiri Client?{" "}
            <span
              className="font-medium text-[#F20101] cursor-pointer"
              onClick={handleRegistration}
            >
              Register
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;