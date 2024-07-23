import { ConnectionToDB } from "@/configs/db_config";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { User as UserModel } from "@/models/user.model";

export const authOptions = {
    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user }) {

            ConnectionToDB();
            
            try {
                const existing_user = await UserModel.findOne({ email: user.email });
                if (existing_user) {
                    return true;
                }
                await UserModel.create({
                    email: user.email,
                    username: user.name,
                });
                return true;
            } catch (error) {
                console.log("The error is ", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },

        async session({
            session,
            token,
            user,
        }) {
            session.user = token.user;
            return session;
        },
    },

    providers: [
        Credentials({
            name: "Welcome Back",
            type: "credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                ConnectionToDB();

                const user = await UserModel.findOne({ email: credentials?.email });
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};
