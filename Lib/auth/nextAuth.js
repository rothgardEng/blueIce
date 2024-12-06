import CredentialsProvider from "next-auth/providers/credentials";
// import Credentials from "next-auth/providers/credentials"
// import { prisma } from "@/server/db/client"
import { prisma } from "@/server/db/client";
import { verifyPassword } from "@/Lib/auth/auth.js";
import { getAdminForCred } from "@/data-access/authActions";

export const authOptions = {
  name: "Credentials",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        //!! should abstract this to DAL?
        // const admin = await prisma.admin.findFirst({
        //   where: { email: credentials.email }
        // });
        const admin = await getAdminForCred(credentials.email);

        if (!admin) {
          await prisma.$disconnect();
          throw new Error("No admin account found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          admin.hashedPassword
        );

        if (!isValid) {
          throw new Error("Incorrect Email or Password entered");
        }
        await prisma.$disconnect();
        //!! abstract this to DAL/DTO, need to change how other parts work before I can change this
        const user = {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          isOverLord: admin.isOverlord
        };
        return user;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    }
  }
};
