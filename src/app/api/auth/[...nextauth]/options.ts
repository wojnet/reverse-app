import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@lib/mongo/clientPromise";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: (process.env.GITHUB_ID as string) || "",
      clientSecret: (process.env.GITHUB_SECRET as string) || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      const client = await clientPromise;
      const db = client.db("songwritingApp");
      let collection = db.collection("userData");

      if (trigger === "signIn" || trigger === "signUp") {
        const count = await collection.countDocuments({
          userId: user.id,
        });

        if (count === 0) {
          let newUserData = {
            userId: user.id,
            name: user.name,
            role: "user",
            projects: { data: [] },
          };

          await collection.insertOne(newUserData);

          let sampleProjectData = {
            name: "Ignorance",
            userId: user.id,
            contents: [
              {
                type: "TITLE_BLOCK",
                data: {
                  title: "Ignorance",
                  subtitle: "Paramore"
                }
              },
              {
                type: "TEXT_BLOCK",
                data: {
                  paragraphs: [
                    {
                      text: "If I'm a bad person, you don't like me",
                      chords: [
                        {
                          name: "A#",
                          position: 0
                        },
                        {
                          name: "A#Maj7",
                          position: 24
                        }
                      ]
                    },
                    {
                      text: "Well, I guess I'll make my own way",
                      chords: [
                        {
                          name: "Cm",
                          position: 14
                        },
                        {
                          name: "D#Maj7",
                          position: 48
                        }
                      ]
                    }
                  ]
                }
              },
              {
                type: "COMMENT_BLOCK",
                data: {
                  text: "description"
                }
              }
            ],
          }

          collection = db.collection("projects"); 
          await collection.insertOne(sampleProjectData);
        }
      }

      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};