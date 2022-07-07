import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import newApolloClient from "../../../lib/MyApolloClient";
import { LOGIN, AUTH_USER, NEW_USER } from "../../../lib/ApolloMutations";
import { USER_FRONTEND } from "../../../lib/ApolloQueries";
import { useAppContext } from "../../../context/context";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "user:email" } },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.avatar_url,
          login: profile.login,
        };
      },
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Username",
          autoComplete: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
          autoComplete: "current-password",
        },
      },
      authorize: async (credentials, req) => {
        const { res, err } = await client.mutate({
          mutation: AUTH_USER,
          variables: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (res) {
          console.log(res);

          User.id = res.singleUser.id;
          User.username = res.singleUser.username;
          User.email = res.singleUser.email;
          return {
            username: res.singleUser.username,
            email: res.singleUser.email,
          };
        } else {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // localStorage.setItem("email", user.email);

      return true;
    },
    // async signIn({ user, account, profile }) {
    //   if (account.provider === "github") {
    //     const client = newApolloClient();
    //     try {
    //       const { res, err } = client
    //         .mutate({
    //           mutation: NEW_USER,
    //           variables: {
    //             name: profile?.login,
    //             email: profile?.email,
    //             avatarUrl: profile?.avatar_url,
    //             password: profile?.id,
    //           },
    //         })
    //         .then((res) => {
    //           console.log(res);
    //           return res;
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           return err;
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //     return true;
    //   }
    // },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      // console.log("in session callback,", session, token, user);
      if (token) {
        session.id = token.id;
        session.username = token.username;
        session.email = token.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("in jwt user =", user, account, profile, isNewUser);
      // console.log(user);
      if (user) {
        token.id = user.id;
        token.username = profile?.login;
        token.email = user.email;
      }

      return token;
    },
  },
  // pages: {
  //   signIn: "/login",
  //   signOut: "/logout",
  // },
  events: {
    signIn: async ({ token, user, account, profile, isNewUser, client }) => {
      // const mycontext = useAppContext();
      // await mycontext.setEmail(user.email);
      // localStorage.setItem("email", user.email);
      // console.log("in signIn user =", user, account, profile, isNewUser);
    },
  },
  logger: {
    error(code, metadata) {
      console.log({ type: "inside error logger", code, metadata });
    },
    warn(code) {
      console.log({ type: "inside warn logger", code });
    },
    debug(code, metadata) {
      console.log({ type: "inside debug logger", code, metadata });
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#1C3144", // Hex color code
    logo: "", // Absolute URL to image
  },
});

async function newUserCheck(user) {
  const client = newApolloClient();

  const { res, err } = client

    .mutate({
      mutation: NEW_USER,
      variables: {
        name: user?.login,
        email: user?.email,
        avatar_url: user?.avatar_url,
        password: user?.id,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
