import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { cc } from "@/utils/consoleColor";

export const PUT = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const { id, name }: { id: string, name: string } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects");

    const response = await collection.updateOne({
      _id: new ObjectId(id),
      name: { $ne: name }
    }, {
      $set: {
        name: name
      }
    });

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/projects/changeName:`, response);
    return Response.json({ id, name, response });
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/projects/changeName:`, error);
    return Response.error();
  }
};
