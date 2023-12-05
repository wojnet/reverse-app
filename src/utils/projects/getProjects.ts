// import { headers } from "next/headers";
import { ProtocalType } from "@/types/protocal";
import { getProtocal } from "../getProtocal";

export const getProjects = async (): Promise<any> => {
  const serverUrl = process.env.SERVER_URL;

  return await fetch(`${serverUrl}/api/projects`, {
    method: "GET",
    cache: "no-store", // for now
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  }).then(res => res.json());
};
