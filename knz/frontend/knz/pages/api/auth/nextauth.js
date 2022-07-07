import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
// import JWTCredentials from "next-auth/providers/jwt";
// import { NextAuthConfig } from "next-auth/dist/providers/base";
import { setJwtToken, setRefreshToken } from "../../../lib/auth";
import ClientOnly from "../../../components/ClientOnly";
import newApolloClient from "../../../lib/MyApolloClient";
import { LOGIN, AUTH_USER } from "../../../lib/ApolloMutations";
// import { AUTH_USER } from "../../../lib/ApolloQueries";
import { useQuery, useMutation } from "@apollo/client";
// import SequelizeAdapter from "@next-auth/sequelize-adapter";
// import { Sequelize } from "sequelize";
import * as React from "react";

const client = newApolloClient();

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
// const sequelize = new Sequelize(process.env.POSTGRESQL_URL);
const User = {
  id: "",
  username: "",
  email: "",
};
const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async ({ username, password }) => {
        const { csrf } = await fetch("/api/auth/login", {
          method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "X-CSRFToken": csrf,
          //   },
          body: JSON.stringify({ username: username, password: password }),
        }).then((res) => {
          res.json();
          console.log(res);

          User.id = res.singleUser.id;
          User.username = res.singleUser.username;
          User.email = res.singleUser.email;
          return User;
        });
        //   .catch((err) => {
        //     console.log(err);
        //   });

        // const { res, err } = client
        //   .mutate({
        //     mutation: AUTH_USER,
        //     variables: { username, password },
        //     credentials: "include",
        //   })
        //   .then((res) => {
        // document.cookie = `JWT=${res.data.tokenAuth.token}; max-age=60;`;
        // document.cookie = `JWT-refresh-token=${res.data.tokenAuth.refreshToken}; max-age=${res.data.tokenAuth.refreshExpiresIn};`;
        // localStorage.setItem("JWTAccessToken", res.data.tokenAuth.token);
        // localStorage.setItem(
        //   "JWTRefreshToken",
        //   res.data.tokenAuth.refreshToken
        // );
        // localStorage.setItem(
        //   "username",
        //   res.data.tokenAuth.payload.username
        // );
        // localStorage.setItem("isLoggedIn", true);
        // router.push("/");
        //     console.log(res);
        //     if (res.errors) {
        //       console.log("errors");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        //   const res = await client.mutate({
        //     mutation: LOGIN,
        //     variables: { email, password },
        //     });
        //     if (res.data.login.token) {
        //         setJwtToken(res.data.login.token);
        //         setRefreshToken(res.data.login.refreshToken);
        //         return {
        //             accessToken: res.data.login.token,
        //             refreshToken: res.data.login.refreshToken,
        //             user: {
        //                 email: res.data.login.user.email,
        //                 id: res.data.login.user.id,
        //                 username: res.data.login.user.username,
        //             },
        //         };
        //     }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  //   adapter: SequelizeAdapter(sequelize),
  //   pages: {
  //     signIn: "/auth/signin",
  //     signOut: "/auth/signout",
  //     error: "/auth/error", // Error code passed in query string as ?error=
  //     verifyRequest: "/auth/verify-request", // (used for check email message)
  //     newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  //   },
  //   session: {
  //     // Choose how you want to save the user session.
  //     // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
  //     // If you use an `adapter` however, we default it to `"database"` instead.
  //     // You can still force a JWT session by explicitly defining `"jwt"`.
  //     // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //     // which is used to look up the session in the database.
  //     strategy: "jwt",

  //     // Seconds - How long until an idle session expires and is no longer valid.
  //     maxAge: 30 * 24 * 60 * 60, // 30 days

  //     // Seconds - Throttle how frequently to write to database to extend a session.
  //     // Use it to limit write operations. Set to 0 to always update the database.
  //     // Note: This option is ignored if using JSON Web Tokens
  //     updateAge: 24 * 60 * 60, // 24 hours
  //   },

  secret: "hbiuniuuibik2kj4bk42kj2bb42kb4k424k4bk24bh4hkbd",
  NEXTAUTH_URL: "http://localhost:3002",
  //   callbacks: {
  //     async signIn({ user, account, profile, email, credentials }) {
  //       return true;
  //     },
  //     async redirect({ url, baseUrl }) {
  //       return baseUrl;
  //     },
  //     async session({ session, token, user }) {
  //       return session;
  //     },
  //     async jwt({ token, user, account, profile, isNewUser }) {
  //       return token;
  //     },
  //   },
  //   jwt: {
  //     // The maximum age of the NextAuth.js issued JWT in seconds.
  //     // Defaults to `session.maxAge`.
  //     maxAge: 60 * 60 * 24 * 30,
  //     // You can define your own encode/decode functions for signing and encryption
  //     async encode() {},
  //     async decode() {},
  //   },

  //   events: {
  //     // Called when a user signs in.
  //     signIn: async ({ user, account, profile, email, credentials }) => {
  //       console.log("signIn", user, account, profile, email, credentials);
  //     },
  //     // Called when a user signs out.
  //     signOut: async ({ user, account, profile, email, credentials }) => {
  //       console.log("signOut", user, account, profile, email, credentials);
  //     },
  //     createUser: async ({ user, account, profile, email, credentials }) => {
  //       console.log("createUser", user, account, profile, email, credentials);
  //     },
  //   },
};
export default (req, res) => NextAuth(req, res, options);
// https://arunoda.me/blog/add-auth-support-to-a-next-js-app-with-a-custom-backend

// const providers = [
//     Providers.GitHub({
//         clientId: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET
//     })
// ]

// const callbacks = {}

// callbacks.signIn = async function signIn(user, account, metadata) {
//     if (account.provider === 'github') {
//         const githubUser = {
//             id: metadata.id,
//             login: metadata.login,
//             name: metadata.name,
//             avatar: user.image
//         }

//         user.accessToken = await getTokenFromYourAPIServer('github', githubUser)
//         return true
//     }

//     return false;
// }

// callbacks.jwt = async function jwt(token, user) {
//     if (user) {
//         token = { accessToken: user.accessToken }
//     }

//     return token
// }

// callbacks.session = async function session(session, token) {
//     session.accessToken = token.accessToken
//     return session
// }

// const options = {
//     providers,
//     callbacks
// }

// export default (req, res) => NextAuth(req, res, options)
// =========================================================
// import CredentialsProvider from "next-auth/providers/credentials";

// providers: [
//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. "Sign in with...")
//     name: "Credentials",
//     // The credentials is used to generate a suitable form on the sign in page.
//     // You can specify whatever fields you are expecting to be submitted.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       username: { label: "Username", type: "text", placeholder: "jsmith" },
//       password: { label: "Password", type: "password" },
//     },
//     async authorize(credentials, req) {
//       // Add logic here to look up the user from the credentials supplied
//       const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

//       if (user) {
//         // Any object returned will be saved in `user` property of the JWT
//         return user;
//       } else {
//         // If you return null then an error will be displayed advising the user to check their details.
//         return null;

//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//       }
//     },
//   }),
// ];
