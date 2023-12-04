// import { headers } from "next/headers";
import { ProtocalType } from "@/types/protocal";
import { getProtocal } from "../getProtocal";

export const getProjects = async (): Promise<any> => {
  const host = window.location.host;
  const protocal: ProtocalType = getProtocal(process.env.NODE_ENV);

  return await fetch(`${protocal}://${host}/api/projects`, {
    method: "GET",
    cache: "no-store", // for now
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  }).then(res => res.json());
};
