import { TransactionServices } from "@/service/transaction/manage-transaction";
import { useQuery} from "@tanstack/react-query";

export const useGetTransaction = () => {
    const query =  useQuery({
        queryKey: ['transaction'],
        queryFn: TransactionServices.get,
    });
    return query;
};
