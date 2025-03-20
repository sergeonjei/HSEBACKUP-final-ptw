import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create a handler using the authOptions from lib/auth.ts
const handler = NextAuth(authOptions);

// Export the handler as the GET and POST methods
export { handler as GET, handler as POST }; 