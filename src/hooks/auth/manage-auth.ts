import { auth_services } from "@/service/auth/manage-auth"
import { useMutation } from "@tanstack/react-query"



export const useForgetPassoword = ()=> {
     return useMutation({
        mutationFn:auth_services.forgetPassword,
     })
}

export const useRegisterUser = ()=> {
     return useMutation({
        mutationFn:auth_services.register,
     })
}

export const useResetPassoword = ()=> {
     return useMutation({
        mutationFn:auth_services.resetPassword,
     })
}
export const useVerifyEmail = ()=> {
     return useMutation({
        mutationFn:auth_services.verifyEmail,
     })
}

