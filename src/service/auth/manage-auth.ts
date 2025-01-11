import { UserRegisterType } from "@/types";
import axios from "axios";

const AUTH_API = {
    FORGET_PASSWORD : `/user/forget-password`,
    RESET_PASSWORD: `/user/reset-password`,
    REGISTER:`/user/register`,
    VERIFY_EMAIL:`/user/send-email-verify-otp`,
    VERIFY_WITH_OTP:`/user/verify-otp`
}

export const auth_services = {

    forgetPassword : async({email}: {email: string}) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.FORGET_PASSWORD}`, {email});
        return response.data;
    },

    resetPassword : async({password,confirmPassword,token}: {password: string,confirmPassword:string,token:string | string [] | undefined}) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.RESET_PASSWORD}`, {password,confirmPassword,token});
        return response.data;
    },

    register: async (RegisterData: UserRegisterType) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.REGISTER}`, RegisterData);
    },

    verifyEmail: async (email:{email:string}) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.VERIFY_EMAIL}`, email);
    },
    verifyOtp: async ({email,otp}:{email:string,otp:string}) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.VERIFY_WITH_OTP}`, {email,otp});
    },


}


