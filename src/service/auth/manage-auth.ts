import axios from "axios";

const AUTH_API = {
    FORGET_PASSWORD : `/user/forget-password`,
}

export const auth_services = {

    forgetPassword : async({email}: {email: string}) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API.FORGET_PASSWORD}`, {email});
        return response.data;
    }

}
