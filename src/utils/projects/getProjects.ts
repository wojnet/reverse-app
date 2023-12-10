"use client";

export const getProjects = async (): Promise<any> => {
  return await fetch(`/api/projects`, {
    method: "GET",
    cache: "default",
  }).then(res => res.json());
};