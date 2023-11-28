import { NextApiRequest } from "next";
import { clientPromise } from "@lib/mongo/clientPromise";

export const GET = async (
  req: NextApiRequest
) => {
  try {
    const db = await clientPromise();
    const songs = await db.collection("sampleSongs").find({});
    return Response.json({ songs });

  } catch (error) {
    return Response.error();
  }
}