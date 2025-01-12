"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpFormSchema } from "../_types/zodSchema";
import { useVerifyOtp } from "@/hooks/auth/manage-auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export function OtpVerifyForm({onClose,email,password}: {onClose:()=>void,email:string,password:string}) {
    const form = useForm<z.infer<typeof OtpFormSchema>>({
        resolver: zodResolver(OtpFormSchema),
        defaultValues: {
            otp: "",
            email:email
        },
    });

    const router = useRouter();
    
    const {mutate:VerifyOtp} = useVerifyOtp();

    async function onSubmitOtp(data: z.infer<typeof OtpFormSchema>) {
        console.log("OTP submitted:", data);
      
        await VerifyOtp(data, {
          onSuccess: async () => {
            toast.success("Email Verified Successfully");
            onClose();
      
            const result = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: password,
            });
      
            if (result?.error) {
              if (result.error === "CredentialsSignin") {
                toast.error("Incorrect Email or password");
              } else {
                toast.error(`Login failed: ${result.error}`);
              }
            }
      
            if (result?.url) {
              toast.success("Login Successful");
              router.push("/dashboard");
            }
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              const errorMessage =
                error.response?.data?.message || "An unexpected error occurred.";
              toast.error(`Error: ${errorMessage}`);
            } else {
              toast.error("An unexpected error occurred.");
            }
          },
        });
      }
      
      

    return (
        <div className="sm:max-w-[425px]">
            <div>
                <div>Email Verification</div>
                <div className="text-[#F20101]">
                    Verify the entered email
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitOtp)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to your email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

  
                        <Button className="w-full bg-[#f21300] text-white" type="submit">
                            Verify OTP
                        </Button>

                </form>
            </Form>
        </div>
    );
}
