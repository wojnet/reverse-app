import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { cc } from "@/utils/consoleColor";
import { ObjectId } from "mongodb";

export const DELETE = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  let { id }: { id: string } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects");

    const response = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: token?.sub,
    });

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/projects/delete:`, response);
    return Response.json({ response, id });
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/projects/delete:`, error);
    return Response.error();
  }
};
