// THIS IS EXMAPLE
import { BussinessDiscussionType, BussinessReminderTypes, CreateBussiness, editBussinessDetails } from '../../types';
import axiosInstance from '@/lib/axiosInstance';

const BUSINESS_API = {
    CREATE: '/business',
    EDIT: (id: string | string[] | undefined) => `/business/${id}/`,
    ADD_DICUSSION: (id: string) => `/business/${id}/discussions`,
    ADD_REMINDERS: (id: string) => `/business/${id}/reminders`,
    GET_ALL: '/business',
    GET_BY_ID: (id: string | string[] | undefined) => `/business/${id}/`,
    // GET_CURRENT: '/admin/current-user'
} as const;

export const bussinessService = {

    getBussinessById: async (id: string | string[] | undefined) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.GET_BY_ID(id)}`);
        return response.data.data;
    },

    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.GET_ALL}`);
        return response.data.data;
    },

    create: async (businessData: CreateBussiness) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.CREATE}`, businessData);
    },

    addDiscussion: async (discussion:BussinessDiscussionType, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ADD_DICUSSION(id)}`, discussion);
    },

    addReminder: async (reminder:BussinessReminderTypes, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ADD_REMINDERS(id)}`, reminder);
    },
    editBussinessDetails: async (editBussinessDetails:editBussinessDetails, id: string | string[] | undefined) => {
        console.log("edit Bussiness")
        return await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.EDIT(id)}`, editBussinessDetails);
    },

    // delete: async (clientData: CreateClientData) => {
    //     return await axiosInstance.delete(
    //       `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.DELETE}`, clientData);
    // },


};