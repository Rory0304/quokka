import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the 'id' property to the user object within the session
      name?: string | null;
      email?: string | null;
    };
  }
  interface JWT {
    id: string; // Add the 'id' property to the JWT token
    // Add any other custom properties you need here
  }
}
