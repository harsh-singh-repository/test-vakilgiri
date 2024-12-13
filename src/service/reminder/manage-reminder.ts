import axiosInstance from "@/lib/axiosInstance";

const REMINDER_API = {
    GET_ALL : `/reminders`,
}

export const reminderServices = {
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${REMINDER_API.GET_ALL}`);
        return response.data.data;
    },

}