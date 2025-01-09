import { useQuery, useMutation} from '@tanstack/react-query';
import {clientService } from '@/service/client/manage-client';
import { 
    AddFileTypeClient,
    clientDiscussionType,
    ClientReminderTypes,
    EditClientData 
} from '@/types';


export const useGetClients = () => {
    const query =  useQuery({
        queryKey: ['clients'],
        queryFn: clientService.get,
    });
    return query;
};

export const useGetClientFiles = (id:string | string [] | undefined) => {
    const query =  useQuery({
        queryKey: ['clientFiles'],
        queryFn:() => clientService.getFilesOfClient(id),
    });
    return query;
};

export const useAddClient = () => {
    return useMutation({
        mutationFn: clientService.create,
    });
};

export const useAddFiletoClient = () => {
    return useMutation({
        mutationFn:(file:AddFileTypeClient)=> clientService.AddFile(file),
    });
};

export const useGetClientsById = (id:string | string [] | undefined) =>{
    const query =  useQuery({
        queryKey: ['clientsId',id],
        queryFn:() => clientService.getClientById(id),
        enabled:!!id,
    });
    return query;
}

export const useGetClientDisscussion = (id:string) =>{
    const query =  useQuery({
        queryKey: ['clientDisscussion',id],
        queryFn:() => clientService.getDiscussion(id),
        enabled:!!id,
    });
    return query;
}

export const useGetClientReminder = (id:string) =>{
    const query =  useQuery({
        queryKey: ['clientReminder',id],
        queryFn:() => clientService.getReminder(id),
        enabled:!!id,
    });
    return query;
}

export const useGetBussinessOfClient = (id:string | string[] | undefined) =>{
    const query =  useQuery({
        queryKey: ['clientsBussiness',id],
        queryFn:() => clientService.getBussinessOfClient(id),
        enabled:!!id,
    });
    return query;
}

export const useSearchClinetQuery = (searchQuery:string) => {
    const query =  useQuery({
        queryKey: ['clientSearch',searchQuery],
        queryFn:() => clientService.searchClient(searchQuery),
        enabled:!!searchQuery,
    });
    return query;
}

export const useAddClientDisscussion = (id:string) => {

    return useMutation({
        mutationFn:(discussion:clientDiscussionType)=> clientService.addDiscussion(discussion,id),
    });
};

export const useRemoveManager = (id: string) => {
    return useMutation({
        mutationFn: (managerId: { managerId: string }) => clientService.removeManager(id, managerId.managerId),
    });
};

export const useDeleteClientDiscussion = () => {
    return useMutation({
       mutationFn:(id:string)=> clientService.deleteDisscussion(id)
    })
};


export const useAddClientManager = (id:string) => {
    return useMutation({
        mutationFn:(managersId:{managersId: string[]})=> clientService.assignManger(id,managersId),
    });
};

export const useEditClient = (id:string | string [] | undefined) => {

    return useMutation({
        mutationFn:(clientData:EditClientData)=> clientService.edit(clientData,id),
    })
};

export const useAddClientReminder = (id:string) => {

    return useMutation({
        mutationFn:(reminders:ClientReminderTypes)=> clientService.addReminder(reminders,id),
    });
};
