import { useQuery, useMutation} from '@tanstack/react-query';
// import { handleMutationSuccess, handleMutationError } from '@/lib/mutation-utils';
// import { UserPayload } from '@/types/index.d';
// import { useCustomToast } from '@/components/providers/toaster-provider';
import {clientService } from '@/service/client/manage-client';
import { 
    clientDiscussionType,
    ClientReminderTypes,
    // ApiResponse,
    // ApiResponse, 
    // CreateClientData, 
    EditClientData 
} from '@/types';


export const useGetClients = () => {
    const query =  useQuery({
        queryKey: ['clients'],
        queryFn: clientService.get,
    });
    return query;
};

export const useAddClient = () => {
    // const toast = useCustomToast();

    return useMutation({
        mutationFn: clientService.create,
    });
};

export const useGetClientsById = (id:string | string [] | undefined) =>{
    const query =  useQuery({
        queryKey: ['clients',id],
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
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(discussion:clientDiscussionType)=> clientService.addDiscussion(discussion,id),
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
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
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(clientData:EditClientData)=> clientService.edit(clientData,id),
        // onSuccess: (response)=>  handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    })
};

export const useAddClientReminder = (id:string) => {
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(reminders:ClientReminderTypes)=> clientService.addReminder(reminders,id),
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    });
};

// export const useDeleteUser = () => {
//     const queryClient = useQueryClient();
//     const toast = useCustomToast();

//     return useMutation({
//         mutationFn: userService.delete,
//         onSuccess: (response) => handleMutationSuccess(response, toast, queryClient, ['users']),
//         onError: (error) => handleMutationError(error, toast)
//     });
// };