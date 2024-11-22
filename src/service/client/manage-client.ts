// THIS IS EXMAPLE
import { ApiResponse, CreateClientData } from '../../types';
import axiosInstance from '@/lib/axiosInstance';

const CLIENT_API = {
    CREATE: '/client',
    EDIT: (id: number) => `/user/edit-client/${id}`,
    DELETE: (id: number) => `/client/delete-client/${id}`,
    GET_ALL: '/client/',
    GET_BY_ID: (id: any) => `/client/${id}`,
    // GET_CURRENT: '/admin/current-user'
} as const;

export const clientService = {
    // add: (userData: UserPayload) =>
    //     fetchHandler<ApiResponse>(USER_API.ADD, 'POST', userData),

    getClientById:async(id:any)=>{
        const response =  await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_BY_ID(id)}`);
        return response.data.data;
    },

    get: async()=>{
        const response =  await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.GET_ALL}`);
            // console.log("Response",response)
            return response.data.data;
    },

    create: async (clientData: CreateClientData) => {
        return await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.CREATE}`, clientData,);
    },

    edit: async (clientData: CreateClientData) => {
        return await axiosInstance.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.EDIT}`, clientData,);
    },

    // delete: async (clientData: CreateClientData) => {
    //     return await axiosInstance.delete(
    //       `${process.env.NEXT_PUBLIC_API_BASE_URL}${CLIENT_API.DELETE}`, clientData);
    // },
    

};