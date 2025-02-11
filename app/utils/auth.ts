// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "./db";
// import Google from "next-auth/providers/google";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHub,
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
//   // Ajoutez la configuration pour les URLs
//   pages: {
//     signIn: "/login",
//     // signOut: '/auth/signout', // Optionnel
//     // error: '/auth/error', // Optionnel
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       console.log("🔄 [Redirect Callback] URL demandée :", url);
//       console.log("🌍 [Redirect Callback] Base URL :", baseUrl);
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//     async signIn({ user, account, profile }) {
//       console.log("✅ [SignIn Callback] Utilisateur :", user);
//       console.log("🔑 [SignIn Callback] Compte :", account);
//       console.log("📄 [SignIn Callback] Profil :", profile);
//       return true;
//     },
//   },
// });

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
});
