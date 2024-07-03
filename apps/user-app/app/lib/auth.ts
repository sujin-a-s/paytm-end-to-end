import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";

interface Credentials {
  phone: string ;
  password: string ;
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }

        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone
            }
          });

          if (existingUser) {
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
              console.log('User authenticated successfully');
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number
              };
            } else {
              console.log('Invalid password');
              return null;
            }
          } else {
            console.log('User not found');
          }

          // If user doesn't exist, create a new user (optional logic)
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword
            }
          });

          console.log('New user created');
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number
          };
        } catch(e) {
          console.error('Error in authorize function:', e);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET || "test",

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session && session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  }
};
