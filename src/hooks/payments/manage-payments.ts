import { PaymentServices } from "@/service/payments/manage-payments";
import { useQuery} from "@tanstack/react-query";

export const useGetPayments = () => {
    const query =  useQuery({
        queryKey: ['payments'],
        queryFn: PaymentServices.get,
    });
    return query;
};

export const useGetPaymentsById = (id:string|undefined) => {
    const query =  useQuery({
        queryKey: ['paymentId'],
        queryFn:()=> PaymentServices.getPaymentById(id),
    });
    return query;
};
