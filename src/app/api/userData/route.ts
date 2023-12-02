import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("userData");

    const userData = await collection.findOne(
      { userId: token?.sub },
      { projection: { projects: true } }
    );

    return Response.json(userData?.projects);
  } catch (error) {
    return Response.error();
  }
};
