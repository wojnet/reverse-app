"use client";

export const getProjects = async (): Promise<any> => {
  return await fetch(`/api/projects`, {
    method: "GET",
    cache: "no-store", // for now
  }).then(res => res.json());
};
