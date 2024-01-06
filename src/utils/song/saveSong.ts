"use client";

import { ColorsType, SongType } from "@/types/song";

export const saveSong = async (id: string, contents: SongType, colors: ColorsType): Promise<any> => {
  if (id?.length !== 24) return;

  return await fetch(`/api/song/save`, {
    method: "PUT",
    cache: "default",
    body: JSON.stringify({ id, contents, colors }),
  }).then(res => res.json());
};