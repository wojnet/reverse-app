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

    console.log("[CONSOLE][SUCCESS] /api/userData:", userData?.projects);
    return Response.json(userData?.projects);
  } catch (error) {

    console.log("[CONSOLE][ERROR] /api/userData:", error);
    return Response.error();
  }
};
