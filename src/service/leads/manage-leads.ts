import axiosInstance from "@/lib/axiosInstance";
import {CreateLeadData, LeadsDiscussionType, LeadsReminderTypes, linkLeadType, updateleadDetails } from "@/types";

const LEADS_API = {
    GET_ALL : `/leads`,
    CREATE: `/leads`,
    DELETE:(id:string)=> `/leads/${id}`,
    UPDATE_LEAD:(id:string)=> `/leads/${id}`,
    GET_BY_ID:(id:string)=>`/leads/${id}`,
    ADD_LEADS_DISCUSSION:(id:string)=>`/leads/${id}/discussions`,
    ADD_LEADS_REMINDER:(id:string)=>`/leads/${id}/reminders`,
    GET_DISCUSSION:(id:string)=>`/leads/${id}/discussions/`,
    GET_REMINDER:(id:string)=>`/leads/${id}/reminders`,
    DELETE_DISCUSSION:(leadId:string,id:string) =>`/leads/${leadId}/discussions/${id}`,
    DELETE_REMINDER:(leadId:string,id:string) =>`/leads/${leadId}/reminders/${id}`,
    LINK_CLIENT:(leadId:string)=>`/leads/${leadId}/link-client`,
    ASSIGN_MANAGER:(leadId:string)=>`/leads/${leadId}/managers`,
    REMOVE_MANAGER:(id:string)=>`/leads/${id}/managers`,
    LINK_BUSSINESS:(id:string)=>`/leads/${id}/link-business`,
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
    },

    getReminder : async (id:string) => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.GET_REMINDER(id)}`);
        return response.data.data;
    },

    deleteReminder: async(leadId:string,id:string) => {
        return await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.DELETE_REMINDER(leadId,id)}`);
    },

    linkClient : async(id:string, clientId: linkLeadType ) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.LINK_CLIENT(id)}`,clientId);
    },

    linkBussiness : async(id:string, businessId:{businessId:string} ) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.LINK_BUSSINESS(id)}`,businessId);
    },
    assignManager : async(id:string, managersId: {managersId: string[]}) => {
        return await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.ASSIGN_MANAGER(id)}`,managersId);
    },
    removeManager : async (id:string,managerId:string)=>{
        return await axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${LEADS_API.REMOVE_MANAGER(id)}`, {
                data: { managerId },
              });
    }
}