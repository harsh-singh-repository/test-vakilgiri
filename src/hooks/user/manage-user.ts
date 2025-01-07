import { useMutation, useQuery} from '@tanstack/react-query';
import { userServices } from '@/service/user/manage-user';

export const useGetUsers = () => {
    const query =  useQuery({
        queryKey: ['user'],
        queryFn: userServices.get,
    });
    return query;
};

export const useGetAllStaff = () => {
    const query =  useQuery({
        queryKey: ['userStaff'],
        queryFn: userServices.getStaff,
    });
    return query;
};

export const useAddStaffRoles = () => {
    return useMutation({
        mutationFn: userServices.create,
    });
};