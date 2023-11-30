import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { ObjectId } from "mongodb";

export const GET = async (
  req: NextRequest
) => {
  const idParam = req.nextUrl.searchParams.get("id") || "";

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("sampleSongs");

    const songs = await collection.findOne({ _id: new ObjectId(idParam) });
  
    return Response.json(songs);

  } catch (error) {
    return Response.error();
  }
}