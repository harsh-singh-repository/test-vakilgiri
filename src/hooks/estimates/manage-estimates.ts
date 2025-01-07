
import { EstimateServices } from "@/service/Estimates/manage-estimates";
import { useQuery} from "@tanstack/react-query";

export const useGetEstimate = () => {
    const query =  useQuery({
        queryKey: ['bussiness'],
        queryFn: EstimateServices.get,
    });
    return query;
};
