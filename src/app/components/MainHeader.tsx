"use client"
import { FC } from 'react';
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from 'next/navigation';

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = async ({}) => {
  const session = await getServerSession()

  if (session) redirect("/create");

  return (
    <header className="w-full h-[100px] flex justify-between items-center p-[10px_50px]">
      <h1 className="text-xl font-[500] select-none">
        Songwriting.io
      </h1>
      <section className="flex items-center gap-4">
        <button
          className="hover:opacity-75 transition"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </section>
    </header>
  );
}

export default MainHeader;