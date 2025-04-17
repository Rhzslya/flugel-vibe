// app/api/auth/[...nextauth]/route.ts (Next.js App Router)

import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
].join(",");

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?scope=${scopes}`;

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTH_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Saat pertama kali login
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan token ke session agar bisa digunakan di client
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login", // optional: custom login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
