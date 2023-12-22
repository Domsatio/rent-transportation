import { existingUser } from "@/controllers/userController";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";

// export const uathOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         name: { label: "Name", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         //login
//         const user = await existingUser(credentials.email);
//         if (user) {
//           const match = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (match) {
//             return Promise.resolve(user);
//           } else {
//             return Promise.resolve(null);
//           }
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//     error: "/login",
//     verifyRequest: "/login",
//     newUser: "/register",
//   },
//   secret: process.env.JWT_SECRET,
//   jwt: {
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   session: { strategy: "jwt" },
// };

// function CredentialsProvider(arg0: {
//   name: string;
//   credentials: {
//     email: { label: string; type: string };
//     name: { label: string; type: string };
//     password: { label: string; type: string };
//   };
//   authorize(credentials: any, req: any): Promise<any>;
// }): import("next-auth/providers/index").Provider {
//   throw new Error("Function not implemented.");
// }

