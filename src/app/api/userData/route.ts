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
    const collection = db.collection("userData");

    const userData = await collection.findOne(
      { userId: token?.sub },
      { projection: { projects: true } }
    );

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/userData:`, userData?.projects);
    return Response.json(userData?.projects);
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/userData:`, error);
    return Response.error();
  }
};
