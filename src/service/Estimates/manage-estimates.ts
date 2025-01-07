import axiosInstance from "@/lib/axiosInstance";

const ESTIMATE_API = {
    GET_ALL : `/estimate/`,
}

export const EstimateServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ESTIMATE_API.GET_ALL}`);
        return response.data.data;
    },

}