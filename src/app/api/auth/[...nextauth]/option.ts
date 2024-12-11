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

                    console.log(user); // Log the entire response
                    console.log(user.data); // Log the response data

                    if (user.data.success === false) {
                        throw new Error(user.data.message);
                    }

                    return user.data; // Ensure user.data contains the expected information
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<ApiResponse>;
                        throw new Error(axiosError.response?.data?.message || "Something went wrong");
                    } else {
                        throw new Error("Unexpected error occurred");
                    }
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log(user);  // Log the entire user object to ensure tokens are present
                token.accessToken = user.data?.token;  // Adjust based on the API response structure
                token.refreshToken = user.refreshToken; // Ensure refreshToken exists
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.accessToken = token?.accessToken;
                session.user.refreshToken = token?.refreshToken;
                console.log("Session object:", session);  // Log session to verify
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
    },
    
  secret: "c2Fkc2FkYXNkYXNkYXNkYXNk",
};
