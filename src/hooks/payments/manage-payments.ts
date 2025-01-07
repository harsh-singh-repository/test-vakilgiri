import { PaymentServices } from "@/service/payments/manage-payments";
import { useQuery} from "@tanstack/react-query";

export const useGetPayments = () => {
    const query =  useQuery({
        queryKey: ['payments'],
        queryFn: PaymentServices.get,
    });
    return query;
};
