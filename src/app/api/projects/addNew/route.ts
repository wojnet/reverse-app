import { NextRequest } from "next/server";
import clientPromise from "@lib/mongo/clientPromise";
import { getToken } from "next-auth/jwt";
import { cc } from "@/utils/consoleColor";

export const PUT = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  let { name }: { name: string | undefined } = await req.json();

  if (!name) name = "no name";

  try {
    const client = await clientPromise;
    const db = client.db("songwritingApp");
    const collection = db.collection("projects");

    const response = await collection.insertOne({
      userId: token?.sub,
      name: name,
      contents: [{
        type: "TITLE_BLOCK",
        data: {
          title: name,
          subtitle: "my new song",
        },
      }],
    });

    console.log(`${cc("[CONSOLE][SUCCESS]", "success")} /api/projects/addNew:`, response);
    return Response.json({ response, name });
  } catch (error) {

    console.log(`${cc("[CONSOLE][ERROR]", "error")} /api/projects/addNew:`, error);
    return Response.error();
  }
};
