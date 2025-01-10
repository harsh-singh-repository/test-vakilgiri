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


export function OtpVerifyForm({ setOtpVerify,onClose}: { setOtpVerify: (verified: boolean) => void ; onClose:()=>void }) {
    const form = useForm<z.infer<typeof OtpFormSchema>>({
        resolver: zodResolver(OtpFormSchema),
        defaultValues: {
            pin: "",
        },
    });

    function onSubmit(data: z.infer<typeof OtpFormSchema>) {
        console.log("OTP submitted:", data);
        setOtpVerify(true);
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="pin"
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
                                    Please enter the one-time password sent to your phone.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

  
                        <Button className="w-full bg-[#f21300] text-white" type="submit" onClick={onClose}>
                            Verify OTP
                        </Button>

                </form>
            </Form>
        </div>
    );
}
