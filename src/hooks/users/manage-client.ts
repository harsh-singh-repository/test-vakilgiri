import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handleMutationSuccess, handleMutationError } from '@/lib/mutation-utils';
// import { UserPayload } from '@/types/index.d';
import { useCustomToast } from '@/components/providers/toaster-provider';
import {clientService } from '@/service/client/manage-client';
import { ApiResponse, CreateClientData, EditClientData } from '@/types';

export const useGetClients = () => {
    const query =  useQuery({
        queryKey: ['clients'],
        queryFn: clientService.get,
    });
    return query;
};

export const useAddClient = () => {
    const queryClient = useQueryClient();
    const toast = useCustomToast();

    return useMutation({
        mutationFn: clientService.create,
        onSuccess: (response) =>
            handleMutationSuccess(response, toast, queryClient, ["clients"]),
        onError: (error: any) => handleMutationError(error, toast),
    });
};

export const useGetClientsById = (id:string) =>{
    const query =  useQuery({
        queryKey: ['clients'],
        queryFn:() => clientService.getClientById(id),
    });
    return query;
}

export const useEditClient = (id:string) => {
    const queryClient = useQueryClient();
    const toast = useCustomToast();

    return useMutation({
        mutationFn:(clientData:EditClientData)=> clientService.edit(clientData,id),
        onSuccess: (response)=>  handleMutationSuccess(response, toast, queryClient, ["clients"]),
        onError: (error: any) => handleMutationError(error, toast),
    })
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