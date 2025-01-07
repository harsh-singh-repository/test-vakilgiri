import axiosInstance from "@/lib/axiosInstance";

const PAYMENT_API = {
    GET_ALL : `/payments`,
}

export const PaymentServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PAYMENT_API.GET_ALL}`);
        return response.data.data;
    },

}