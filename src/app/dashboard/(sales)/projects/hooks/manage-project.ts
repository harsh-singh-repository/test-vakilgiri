// hooks/manage-projects.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateProjectData, Project } from "../types";
import { projectServices } from "../services/manage-projects";

export const useGetProjects = () => {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: projectServices.getAll,
    });
};

export const useGetProjectById = (id: string) => {
    return useQuery<Project>({
        queryKey: ["project", id],
        queryFn: () => projectServices.getById(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    return useMutation({
        mutationFn: (projectData: CreateProjectData) => projectServices.create(projectData),
    });
};

export const useDeleteProject = () => {
    return useMutation({
        mutationFn: (id: string) => projectServices.delete(id),
    });
};