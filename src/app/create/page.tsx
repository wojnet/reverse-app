import { FC } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const create: FC = async () => {
  const session = await getServerSession();

  if (!session) redirect("/");

  return (
    <div className="w-full h-full flex-1 flex justify-between">
    
    </div>
  );
}

export default create;