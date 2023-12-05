import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";

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

    console.log("[SUCCESS] /api/projects:", projects);
    return Response.json(projects);
  } catch (error) {

    console.log("[ERROR] /api/projects:", error);
    return Response.error();
  }
};
