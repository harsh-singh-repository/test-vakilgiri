// THIS IS EXMAPLE
import axios from 'axios';
import {AddFileType, BussinessDiscussionType, BussinessReminderTypes, CreateBussiness, editBussinessDetails } from '../../types';
import axiosInstance from '@/lib/axiosInstance';
import { getSession } from 'next-auth/react';

const BUSINESS_API = {
    CREATE: '/business',
    EDIT: (id: string | string[] | undefined) => `/business/${id}/`,
    ADD_DICUSSION: (id: string) => `/business/${id}/discussions`,
    GET_DICUSSION: (id: string) => `/business/${id}/discussions`,
    ADD_REMINDERS: (id: string) => `/business/${id}/reminders`,
    GET_REMINDERS: (id: string) => `/business/${id}/reminders`,
    DELETE_DISSCUSSION: (id: string,bussinessId:string) => `/business/${bussinessId}/discussions/${id}`,
    DELETE_REMINDER: (id: string,bussinessId:string) => `/business/${bussinessId}/reminders/${id}`,
    GET_ALL: '/business',
    GET_COUNT:`/business/types`,
    SEARCH_BUSSINESS:(searchQuery:string)=>`/business/search?query=${searchQuery}`,
    GET_BY_ID: (id: string | string[] | undefined) => `/business/${id}/`,
    ASSIGN_MANAGER:  (id:string) => `/business/${id}/managers`,
    ADD_FILE:`/files/upload/business`,
    ASSIGN_CONTACT_PERSON:(id:string  | string [] | undefined)=>`/business/${id}/contact-person`,
    REMOVE_MANAGER:(id:string) => `/business/${id}/managers`,
    CLIENT_TO_BUSSINESS:(id:string|string[]|undefined)=>`/business/${id}/clients`
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

    getCount: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.GET_COUNT}`);
        return response.data.data;
    },

    create: async (businessData: CreateBussiness) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.CREATE}`, businessData);
    },

    assignContactPerson: async (contactPersonId:{contactPersonId:string},businessId:string  | string [] | undefined) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ASSIGN_CONTACT_PERSON(businessId)}`,contactPersonId);
    },

    addDiscussion: async (discussion:BussinessDiscussionType, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ADD_DICUSSION(id)}`, discussion);
    },

    AddFile: async (addFile:AddFileType) => {
        const session = await getSession();
        const token = session?.user.accessToken;
        return await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ADD_FILE}`,
            addFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization":`Bearer ${token}`,
                },
            }
        );
    },

    getBussinessDisscussion: async (id:string) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.GET_DICUSSION(id)}`);
        return response.data.data;
    },

    addReminder: async (reminder:BussinessReminderTypes, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ADD_REMINDERS(id)}`, reminder);
    },
    
    editBussinessDetails: async (editBussinessDetails:editBussinessDetails, id: string | string[] | undefined) => {
        return await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.EDIT(id)}`, editBussinessDetails);
    },

    getReminder : async (id:string) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.GET_REMINDERS(id)}`);
        return response.data.data;
    },


    deleteDisscussion: async (id:string,bussinessId:string) => {
        return await axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.DELETE_DISSCUSSION(id,bussinessId)}`);
    },

    deleteReminder: async (id:string,bussinessId:string) => {
        return await axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.DELETE_REMINDER(id,bussinessId)}`);
    },

    assignManger:async(id:string,managersId: {managersId: string[]})=>{
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.ASSIGN_MANAGER(id)}`,managersId);
    },
    
    getBussinessBySearch: async(searchQuery:string)=>{
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.SEARCH_BUSSINESS(searchQuery)}`);
        return response.data.data;
    },

    removeManager : async (id:string,managerId:string)=>{
        return await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.REMOVE_MANAGER(id)}`, {
                data: { managerId },
              });
    },
    clientToBussiness: async(id:string|string[]|undefined,clientIds:{clientIds:string[]})=>{
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${BUSINESS_API.CLIENT_TO_BUSSINESS(id)}`,clientIds);
    }

};