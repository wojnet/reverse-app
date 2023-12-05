import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest) => {
  const idParam = req.nextUrl.searchParams.get("id") || "";
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("userData");

    const songs = await collection.findOne({ _id: new ObjectId(idParam) });

    console.log("[CONSOLE][SUCCESS] /api/songs:", songs);
    return Response.json(songs);
  } catch (error) {

    console.log("[CONSOLE][ERROR] /api/songs:", error);
    return Response.error();
  }
};
