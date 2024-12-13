import { reminderServices } from "@/service/reminder/manage-reminder";
import { useQuery} from "@tanstack/react-query";

export const useGetReminder = () => {
    const query =  useQuery({
        queryKey: ['reminder'],
        queryFn: reminderServices.get,
    });
    return query;
};
