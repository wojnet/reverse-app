import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { cc } from "@/utils/consoleColor";

export const GET = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects");

    const projectsCursor = collection.find({
        userId: token?.sub,
    }, {
      projection: {
        _id: true,
        name: true,
      }
    });

    let projects = [];
    for await (const project of projectsCursor) {
        projects.push(project);
    }

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/projects:`, projects);
    return Response.json(projects);
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/projects:`, error);
    return Response.error();
  }
};
