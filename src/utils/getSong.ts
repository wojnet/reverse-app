import { headers } from "next/headers";
import { ProtocalType } from "@/app/types/protocal";
import { getProtocal } from "./getProtocal";

export const getSong = async (): Promise<any> => {
  const host = headers().get("host");
  const protocal: ProtocalType = getProtocal(process.env.NODE_ENV);

  return await fetch(`${protocal}://${host}/api/song`, {
    method: "GET",
    cache: "no-store", // for now
  }).then(res => res.json());
}