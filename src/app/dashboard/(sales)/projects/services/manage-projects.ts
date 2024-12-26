import axiosInstance from "@/lib/axiosInstance";
import { CreateProjectData, Project } from "../types";

const PROJECTS_API = {
    GET_ALL: `/project`,
    GET_BY_ID: (id: string) => `/projects/${id}`,
    CREATE: `/projects`,
    DELETE: (id: string) => `/projects/${id}`,
};

export const projectServices = {
    getAll: async (): Promise<Project[]> => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PROJECTS_API.GET_ALL}`);
        return response.data.data;
    },

    getById: async (id: string): Promise<Project> => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PROJECTS_API.GET_BY_ID(id)}`);
        return response.data.data;
    },

    create: async (projectData: CreateProjectData): Promise<Project> => {
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${PROJECTS_API.CREATE}`,
            projectData
        );
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}${PROJECTS_API.DELETE(id)}`);
    },
};
