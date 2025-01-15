import axiosInstance from "@/lib/axiosInstance";

const PAYMENT_API = {
    GET_ALL : `/payments`,
    GET_BY_ID:(id:string|undefined)=> `/wallet/${id}`
}

export const PaymentServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PAYMENT_API.GET_ALL}`);
        return response.data.data;
    },
    getPaymentById: async (id:string | undefined) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PAYMENT_API.GET_BY_ID(id)}`);
        return response.data.data;
    },
}