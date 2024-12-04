import { leadServices } from "@/service/leads/manage-leads";
import { LeadsDiscussionType, LeadsReminderTypes } from "@/types";
import { useQuery,useMutation } from "@tanstack/react-query";

export const useGetLeads = () => {
    const query =  useQuery({
        queryKey: ['leads'],
        queryFn: leadServices.get,
    });
    return query;
};

export const useAddLeads = () => {
    return useMutation({
        mutationFn: leadServices.create,
    });
};

export const useAddLeadsDiscussion = (id:string) => {
    return useMutation({
        mutationFn:(discussion:LeadsDiscussionType)=> leadServices.addLeadDisscussion(id,discussion),
    });
};
export const useAddLeadsReminder = (id:string) => {
    return useMutation({
        mutationFn:(Reminder:LeadsReminderTypes)=> leadServices.addReminder(Reminder,id),
    });
};

export const useGetLeadsById = (id:string) => {
    const query = useQuery({
        queryKey: ['leads',id],
        queryFn:() => leadServices.getLeadsById(id),
        enabled:!!id,
    })
    return query;
};

export const useGetLeadsDisscussion = (id:string) =>{
    const query =  useQuery({
        queryKey: ['leadsDisscussion',id],
        queryFn:() => leadServices.getDiscussion(id),
        enabled:!!id,
    });
    return query;
}
export const useDeleteLeads = () =>{
    return useMutation({
        mutationFn:(id:string)=> leadServices.deleteLead(id),
    })
}
