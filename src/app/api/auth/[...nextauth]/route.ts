import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        KeycloakProvider({
            clientId: "nextAuthKeycloak",
            clientSecret: "nlNrnjDZ293jK4lq8WjqIMtLelo7NifY",
            issuer: "http://localhost:8080/realms/test",
        })
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user }
            }
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
}

// export default NextAuth(authOptions)


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };