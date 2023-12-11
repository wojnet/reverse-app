import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import { cc } from "@/utils/consoleColor";

export const GET = async (req: NextRequest) => {
  const idParam = req.nextUrl.searchParams.get("id") || "";
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects");

    const song = await collection.findOne({
      _id: new ObjectId(idParam),
      userId: token?.sub
    });

    // console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/song:`, song);
    return Response.json(song);
  } catch (error) {

    // console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/song:`, error);
    return Response.error();
  }
};
