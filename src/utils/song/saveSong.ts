"use client";

import { SongType } from "@/types/song";

export const saveSong = async (id: string, contents: SongType): Promise<any> => {
  if (id?.length !== 24) return;

  console.log("contents:", contents);

  return await fetch(`/api/song/save`, {
    method: "PUT",
    cache: "default",
    body: JSON.stringify({ id, contents }),
  }).then(res => res.json());
};