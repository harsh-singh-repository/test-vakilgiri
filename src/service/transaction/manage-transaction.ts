import axiosInstance from "@/lib/axiosInstance";

const TRANSACTION_API = {
    GET_ALL : `/wallet/razorpay`,
}

export const TransactionServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${TRANSACTION_API.GET_ALL}`);
        return response.data.data;
    },
}