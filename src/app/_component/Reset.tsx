"use client";
 
import logo from "@/app/assets/logo.png";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
// import { getSession} from "next-auth/react";
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
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
import { ResetformSchema } from "../_types/zodSchema";

// Define schema with gender and birthdate fields



const Reset= ({}) => {
  const form = useForm<z.infer<typeof ResetformSchema>>({
    resolver: zodResolver(ResetformSchema),
    defaultValues: {
      password: "",
      confirmPassword:"",
    },
  });
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
//   const router = useRouter();
  const [loader] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof ResetformSchema>) {
    console.log(data);

    // const response = 
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
            name="password"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Password
                </FormLabel>
                <Input type="password" placeholder="Enter Password" {...field} />
                <FormMessage />
              </div>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <div>
                <FormLabel className="text-[#091747] font-[600] text-[13px]">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
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
              loader ? <Loader2 className="animate-spin" /> : "Reset"
            }
          </Button>

          {/* Forget Password */}
        </form>
      </Form>
    </div>
  );
};

export default Reset;