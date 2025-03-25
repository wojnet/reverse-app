import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import clientPromise from "@lib/mongo/clientPromise";
import sampleSong from "@/data/sample/sampleSong";

export const options: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: (process.env.SPOTIFY_ID as string) || "",
      clientSecret: (process.env.SPOTIFY_SECRET as string) || "",
    }),
    GitHubProvider({
      clientId: (process.env.GITHUB_ID as string) || "",
      clientSecret: (process.env.GITHUB_SECRET as string) || "",
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_ID as string) || "",
      clientSecret: (process.env.GOOGLE_SECRET as string) || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      const client = await clientPromise;
      const db = client.db("songwritingApp");
      let collection = db.collection("userData");

      if (trigger === "signIn" || trigger === "signUp") {
        const count = await collection.countDocuments({
          userId: user.id,
        });

        console.log("user", user);

        if (count === 0) {
          let newUserData = {
            userId: user.id,
            name: user.name,
            role: "user",
            provider: account?.provider,
          };

          await collection.insertOne(newUserData);

          collection = db.collection("projects"); 
          await collection.insertOne({...sampleSong, userId: user.id});
        }
      }

      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};