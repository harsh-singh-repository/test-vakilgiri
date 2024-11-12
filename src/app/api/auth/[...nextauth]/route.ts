import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          throw new Error("Login failed");
        }

        const data = await res.json();

        if (data && data.accessToken) {
          return { ...data, accessToken: data.accessToken, refreshToken: data.refreshToken };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        refreshToken:token?.refreshToken,
        accessToken:token?.accessToken
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
