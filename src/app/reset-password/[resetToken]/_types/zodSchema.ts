import { z } from "zod";

export const ResetformSchema = z.object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    token:z.union([
      z.string().min(8),         // A single string with a minimum length of 8
      z.array(z.string().min(8)) // An array of strings, each with a minimum length of 8
    ]), 
  });