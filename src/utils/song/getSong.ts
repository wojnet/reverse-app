"use client";

export const getSong = async (id: string | undefined): Promise<any> => {
  if (id?.length !== 24) return;

  return await fetch(`/api/song?id=${id}`, {
    method: "GET",
    cache: "no-store",
  }).then(res => res.json());
};
