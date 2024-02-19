// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
// } = NextAuth({
//     pages: {
//         signIn: "/login",
//         newUser: "/join",
//     },
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials: Record<any, any>, req: any) {
//                 console.log(credentials);
//                 const authResponse = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/login`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         id: credentials.id,
//                         password: credentials.password,
//                     }),
//                 });
//                 const user = await authResponse.data;
//                 console.log("User from server:", user);
//                 return {
//                     email: user.id,
//                     name: user.nickname,
//                     ...user,
//                 };
//             },
//         }),
//     ],
//     callbacks: {
//         jwt({ token }) {
//             console.log("auth.ts jwt", token);
//             token.userId = token.test = "test";
//             return token;
//         },
//         session({ session, newSession, user }) {
//             console.log("auth.ts session", session, newSession, user);
//             return session;
//         },
//     },
//     events: {
//         session(data) {
//             console.log("auth.ts events session", "session" in data && data.session, "token" in data && data.token);
//         },
//     },
// });

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    pages: {
        signIn: "/login",
        newUser: "/join",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<any, any>, req: any) {
                console.log(credentials);
                console.log("ABCDEEEEE");

                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                const user = await response.data;
                console.log("Response from server:", response);
                console.log("User from server:", user);

                // if (response && user.token) {
                //     return { token: user.token, rfToken: user.rfToken };
                // } else {
                //     // 로그인 실패 시 처리
                //     throw new Error("Login failed!");
                // }
                return {
                    email: user.id,
                    name: user.nickname,
                    ...user,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            console.log(token);
            console.log(user);
            if (user) {
                // token = user; // { token: data.token, rfToken: data.rfToken }
            }
            return token;
        },
        session({ session, user }) {
            console.log(session);
            console.log(user);
            // session.token = user.token;
            return session;
        },
    },
    // callbacks: {
    //     jwt({ token }) {
    //         console.log("auth.ts jwt", token);
    //         token.userId = token.test = "test";
    //         return token;
    //     },
    //     session({ session, newSession, user }) {
    //         console.log("auth.ts session", session, newSession, user);
    //         return session;
    //     },
    // },
});
