import axios, { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiResponse } from "../../../../types";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const user = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, {
                        email: credentials?.email,
                        password: credentials?.password
                    });
                    console.log(user);
                    console.log(user.data.data.token);

                    if(user.data.success === false){
                        throw new Error(user.data.message);
                    }
                    return user.data;
                } catch (error) {
                    // type error
                    const axiosError = error as AxiosError<ApiResponse>;
                    throw new Error(axiosError.response?.data?.message || "Something went wrong");
                }
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.data?.token;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                refreshToken: token?.refreshToken,
                accessToken: token?.accessToken
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
};