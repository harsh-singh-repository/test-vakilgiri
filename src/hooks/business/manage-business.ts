import {  useMutation, useQuery} from '@tanstack/react-query';
// import { handleMutationSuccess, handleMutationError } from '@/lib/mutation-utils';
// // import { UserPayload } from '@/types/index.d';
// import { useCustomToast } from '@/components/providers/toaster-provider';
// import { 
//     // ApiResponse, 
//     // CreateClientData, 
//     EditClientData 
// } from '@/types';
import { bussinessService } from '@/service/business/manage-business';
import { BussinessDiscussionType, BussinessReminderTypes, editBussinessDetails } from '@/types';

export const useGetBussiness = () => {
    const query =  useQuery({
        queryKey: ['bussiness'],
        queryFn: bussinessService.get,
    });
    return query;
};

export const useAddBusiness = () => {
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn: bussinessService.create,
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    });
};
export const useAddBusinessDisscussion = (id:string) => {
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(discussion:BussinessDiscussionType)=> bussinessService.addDiscussion(discussion,id),
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    });
};

export const useEditBussinessDetails = (id:string | string[] | undefined) => {
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(editBussiness:editBussinessDetails)=> bussinessService.editBussinessDetails(editBussiness,id),
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    });
};


export const useAddBusinessReminder = (id:string) => {
    // const queryClient = useQueryClient();
    // const toast = useCustomToast();

    return useMutation({
        mutationFn:(reminders:BussinessReminderTypes)=> bussinessService.addReminder(reminders,id),
        // onSuccess: (response) =>
        //     handleMutationSuccess(response, toast, queryClient, ["clients"]),
        // onError: (error) => handleMutationError(error, toast),
    });
};

export const useGetBussinessById = (id:string | string[] | undefined) =>{
    const query =  useQuery({
        queryKey: ['bussiness',id],
        queryFn:() => bussinessService.getBussinessById(id),
        enabled:!!id,
    });
    return query;
}

// export const useEditClient = (id:string) => {
//     const queryClient = useQueryClient();
//     const toast = useCustomToast();

//     return useMutation({
//         mutationFn:(clientData:EditClientData)=> clientService.edit(clientData,id),
//         onSuccess: (response)=>  handleMutationSuccess(response, toast, queryClient, ["clients"]),
//         onError: (error) => handleMutationError(error, toast),
//     })
// };
