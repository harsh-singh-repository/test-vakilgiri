import { useQuery} from '@tanstack/react-query';
import { userServices } from '@/service/user/manage-user';

export const useGetUsers = () => {
    const query =  useQuery({
        queryKey: ['clients'],
        queryFn: userServices.get,
    });
    return query;
};