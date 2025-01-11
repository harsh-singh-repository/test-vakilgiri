import { z } from "zod"

export const RegisterformSchema = z.object({
    firstname: z.string().min(1, { message: "First Name is required" }),
    lastname: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    mobile_number: z.string().min(10, { message: "Invalid mobile number" }),
    pan: z.string().min(10, { message: "PAN number should be 10 characters" }),
    dob: z.date({ required_error: "Birthdate is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z.string().min(8, { message: "Please confirm your password" }),
    gender: z.enum(["Male", "Female", "Other"]),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

 export const ForgetPasswordformSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });

 export const LoginformSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

export const OtpFormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});