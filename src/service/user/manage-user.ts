import axiosInstance from "@/lib/axiosInstance";
import { StaffDataTypes } from "@/types";

const USER_API = {
    GET_ALL : `/manager`,
    CREATE_ROLES:`/user/registerByRole`
}

export const userServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.GET_ALL}`);
        return response.data.data;
    },
    create: async (StaffData: StaffDataTypes) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.CREATE_ROLES}`, StaffData);
    },


}