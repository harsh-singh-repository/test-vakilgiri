// THIS IS EXMAPLE
import {
    clientDiscussionType,
    ClientReminderTypes,
    // ApiResponse, 
    CreateClientData,
    EditClientData
} from '../../types';
import axiosInstance from '@/lib/axiosInstance';

const CLIENT_API = {
    CREATE: '/client',
    EDIT: (id: string | string [] | undefined) => `/client/${id}`,
    // DELETE: (id: number) => `/client/delete-client/${id}`,
    GET_ALL: '/client/',
    GET_BUSSINESS:(id:string | string[] | undefined) => `/client/${id}/businesses`,
    GET_BY_ID: (id : string | string [] | undefined) => `/client/${id}`,
    GET_CURRENT: '/admin/current-user',
    ADD_DICUSSION: (id: string) => `/client/${id}/discussions`,
    GET_DICUSSION: (id: string) => `/client/${id}/discussions`,
    ADD_REMINDER: (id: string) => `/client/${id}/reminders`,
    DELETE_DISCUSSION: (id: string,clientId:string) => `/client/${clientId}/discussions/${id}`,
    SEARCH: (searchQuey:string) => `/client?query=${searchQuey}`
} as const;

export const clientService = {

    getClientById: async (id : string | string [] | undefined) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_BY_ID(id)}`);
        console.log("Env",process.env.NEXT_PUBLIC_API_BASE_URL)
        return response.data.data;
    },

    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_ALL}`);
        return response.data.data;
    },

    create: async (clientData: CreateClientData) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.CREATE}`, clientData,);
    },

    edit: async (clientData: EditClientData, id: string | string [] | undefined) => {
        return await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.EDIT(id)}`, clientData);
    },

    addDiscussion: async (discussion:clientDiscussionType, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.ADD_DICUSSION(id)}`, discussion);
    },

    getDiscussion: async (id: string) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_DICUSSION(id)}`);
        return response.data.data;
    },
    
    addReminder: async (discussion:ClientReminderTypes, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.ADD_REMINDER(id)}`, discussion);
    },

    getBussinessOfClient: async (id:string | string[] | undefined) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_BUSSINESS(id)}`);
        return response.data.data;
    },

    deleteDisscussion: async (id:string,clientId:string) => {
        return await axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.DELETE_DISCUSSION(id,clientId)}`);
    },

    searchClient: async(searchQuery:string)=>{
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.SEARCH(searchQuery)}`);
        return response.data.data;
    }
};