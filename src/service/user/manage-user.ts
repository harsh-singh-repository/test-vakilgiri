import axiosInstance from "@/lib/axiosInstance";
import { StaffDataTypes } from "@/types";

const USER_API = {
    GET_ALL_ASSIGNED_MANAGER : `/manager`,
    GET_ALL_STAFF : `/user`,
    CREATE_ROLES:`/user/registerByRole`
}

export const userServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.GET_ALL_ASSIGNED_MANAGER}`);
        return response.data.data;
    },
    getStaff: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.GET_ALL_STAFF}`);
        return response.data.data;
    },
    create: async (StaffData: StaffDataTypes) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.CREATE_ROLES}`, StaffData);
    },


}