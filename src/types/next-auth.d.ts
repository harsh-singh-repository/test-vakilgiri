import "next-auth";

declare module 'next-auth' {
    interface User{
        _id?:string;
        accessToken?:string;
        refreshToken?:string;
        data?:{
            token:string,
            data?:{
                id:string,
                firstName: string,
                lastName: string,
                email: string,
            }
        }
    }
    interface Session{
        user:{
            _id?:string;
            accessToken?:string;
            refreshToken?:string;
            firstName?: string;
            lastName?: string;
            email?: string;
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        _id?:string;
        accessToken?:string;
        refreshToken?:string;
        firstname?: string;
        lastName?: string;
        email?: string;
    }

}