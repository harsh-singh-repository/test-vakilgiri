import axiosInstance from "@/lib/axiosInstance";

const USER_API = {
    GET_ALL : `/user`,
}

export const userServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${USER_API.GET_ALL}`);
        return response.data.data;
    },

}