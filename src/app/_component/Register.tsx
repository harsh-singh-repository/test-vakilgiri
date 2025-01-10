"use client";

import Logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OtpVerifyForm } from "./OtpVerify";
import { RegisterProps } from "../_types";
import { RegisterformSchema } from "../_types/zodSchema";
import CustomDatePicker from "@/components/date-picker/CustomDatePicker";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRegisterUser, useVerifyEmail } from "@/hooks/auth/manage-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Modal from "@/components/model/custom-modal";

export default function Register({ alreadyLogin }: RegisterProps) {
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate } = useRegisterUser();

  const { mutate: VerifyEmail } = useVerifyEmail();

  const form = useForm<z.infer<typeof RegisterformSchema>>({
    resolver: zodResolver(RegisterformSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile_number: "",
      pan: "",
      dob: undefined,
      gender: undefined,
      password: "",
      confirm_password: "",
    },
  });

  const clickVerifyOtp = (email:{email:string}) => {
    VerifyEmail(email, {
      onSuccess: () => {
        toast.success("Manager Removed");
        openModal(); 
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
  };

  async function onSubmit(data: z.infer<typeof RegisterformSchema>) {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      setIsSuccess(true);
      mutate(data, {
        onSuccess: () => {
          toast.success("Manager Removed");
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
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="text-black flex flex-col justify-center items-center text-center w-full max-w-3xl p-4">
      <Image src={Logo} alt="vakilgiri_logo" height={150} width={150} />
      <h1 className="text-black font-bold text-2xl">Welcome to Vakilgiri</h1>
      <span className="text-[#002537] font-medium text-base">
        Please register to your account and start the adventure
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1 text-left"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Mobile Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter PAN Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({}) => (
              <FormItem>
                <CustomDatePicker />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!otpVerified ? (
               <div>
                <Button
                  className="w-full bg-[#f21300] text-white hover:bg-[#d11100]"
                  onClick={() => { 
                    clickVerifyOtp({ email: email }); 
                   
                  }}
                >
                  Verify Email with OTP
                </Button>

               <Modal  isOpen={isModalOpen} onClose={closeModal} className="p-4">
                     <OtpVerifyForm setOtpVerify={setOtpVerified} onClose={closeModal}/>
               </Modal>
               </div>
          

          ) : (
            <Button
              type="submit"
              className="w-full bg-[#f21300] hover:bg-[#d11100] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          )}

          {isSubmitting && (
            <p className="text-center text-gray-500">Submitting...</p>
          )}
          {isSuccess && (
            <p className="text-center text-green-500">
              Registration successful!
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="flex gap-1 items-center justify-center text-sky-950 font-medium">
            Already a Client?{" "}
            <Button
              variant="link"
              className="font-medium text-[#f21300] p-0 h-auto"
              onClick={alreadyLogin}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
