// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-playback-state",
  "user-read-currently-playing",
].join(",");

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?scope=${scopes}&show_dialog=true`;

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTH_URL,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 24 * 60,
    updateAge: 0,
  },
  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
        token.createdAt = Math.floor(Date.now() / 1000);
      }

      if (
        typeof token.createdAt === "number" &&
        now - token.createdAt > 86400
      ) {
        return {};
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.accessToken) return session;

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/", // atau "/login" jika kamu punya halaman login custom
  },
};
