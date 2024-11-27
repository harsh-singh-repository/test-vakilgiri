"use client";
 
import logo from "@/app/assets/logo.png";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginProps } from "../_types";
import { LoginformSchema } from "../_types/zodSchema";

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

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof LoginformSchema>) {
    setloader(true);
   
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setloader(false);
    console.log(result);
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: result.error || "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
      toast({
        title: "Login Success",
        description: "Login Success",
        variant: "default",
      });
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
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

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
