import "next-auth";

declare module 'next-auth' {
    interface User{
        _id?:string;
        accessToken?:string;
        refreshToken?:string;
    }
    interface Session{
        user:{
            _id?:string;
            accessToken?:string;
            refreshToken?:string;
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        _id?:string;
        accessToken?:string;
        refreshToken?:string;
    }
}