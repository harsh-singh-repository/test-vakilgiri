import { auth_services } from "@/service/auth/manage-auth"
import { useMutation } from "@tanstack/react-query"



export const useForgetPassoword = ()=> {
     return useMutation({
        mutationFn:auth_services.forgetPassword,
     })
}