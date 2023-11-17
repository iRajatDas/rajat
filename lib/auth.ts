import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import { type NextAuthOptions } from "next-auth";
import { queryBuilder, users } from "@/lib/db/queryBuilder";
import env from "@/lib/env";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(queryBuilder),
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return { session };
};

export const getCurrentUser = async () => {
  const { session } = await getUserSession();

  if (!session) return null;

  const currentUser = await queryBuilder.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!currentUser) return null;

  return { currentUser };
};
