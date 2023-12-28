import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { ObjectId } from "mongodb";
import { cc } from "@/utils/consoleColor";
import { SongType } from "@/types/song";
import { getToken } from "next-auth/jwt";
import { BlockType } from "@/types/blocks";

export const PUT = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const { id, contents }: { id: string, contents: { type: BlockType, data: any } } = await req.json();

  console.log(cc("OKEJ OKEJ", "error"));

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects"); 

    const response = await collection.updateOne({
      _id: new ObjectId(id),
      userId: token?.sub, 
    }, {
      $set: {
        contents: contents,
      }
    });

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/song/save:`, response);
    return Response.json({ response });
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/song/save:`, error);
    return Response.error();
  }
};
