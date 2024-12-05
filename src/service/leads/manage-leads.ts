import axiosInstance from "@/lib/axiosInstance";
import {CreateLeadData, LeadsDiscussionType, LeadsReminderTypes, updateleadDetails } from "@/types";

const LEADS_API = {
    GET_ALL : `/leads`,
    CREATE: `/leads`,
    DELETE:(id:string)=> `/leads/${id}`,
    UPDATE_LEAD:(id:string)=> `/leads/${id}`,
    GET_BY_ID:(id:string)=>`/leads/${id}`,
    ADD_LEADS_DISCUSSION:(id:string)=>`/leads/${id}/discussions`,
    ADD_LEADS_REMINDER:(id:string)=>`/leads/${id}/reminders`,
    GET_DISCUSSION:(id:string)=>`/leads/${id}/discussions/`,
    DELETE_DISCUSSION:(leadId:string,id:string) =>`/leads/${leadId}/discussions/${id}`
}

export const leadServices = {
    
    get: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.GET_ALL}`);
        return response.data.data;
    },

    create: async (LeadsData: CreateLeadData) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.CREATE}`, LeadsData);
    },

    deleteLead: async(id:string) => {
        return await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.DELETE(id)}`
        )
    },
    
    getLeadsById: async (id:string) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.GET_BY_ID(id)}`);
        return response.data.data;
    },

    addLeadDisscussion : async(id:string,leadsDiscussion:LeadsDiscussionType)=>{
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.ADD_LEADS_DISCUSSION(id)}`, leadsDiscussion);
    },

    addReminder: async (reminder:LeadsReminderTypes, id: string) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.ADD_LEADS_REMINDER(id)}`, reminder);
    },

    deleteDisscussion: async (leadId:string,id:string) => {
        return await axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.DELETE_DISCUSSION(leadId,id)}`);
    },

    getDiscussion: async(id:string) =>{
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.GET_DISCUSSION(id)}`);
        return response.data.data;
    },

    updateLead : async(id:string,updateLeadDetails:updateleadDetails)=>{
        return await axiosInstance.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.UPDATE_LEAD(id)}`, updateLeadDetails);
    }
}