"use client"
import { FC } from 'react';
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from 'next/navigation';
import Image from 'next/image';

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = async ({}) => {
  const session = await getServerSession()

  if (session) redirect("/create");

  return (
    <header className="w-full h-[150px] flex justify-center items-center p-[10px_50px]">
      <section className="flex flex-col items-center gap-3 select-none">
        {/* <h1 className="text-2xl font-[700] select-none">
          RE-VERSE
        </h1> */}
        <Image
          className="opacity-90"
          width={200}
          height={100}
          src="/logo.svg"
          alt="reverse logo"
        />
        <p className="opacity-90">SONGWRITING APP</p>
      </section>
      <section className="flex items-center gap-4">
        {/* <button
          className="hover:opacity-75 transition"
          onClick={() => alert(123)}
        >
          Sign in
        </button> */}
      </section>
    </header>
  );
}

export default MainHeader;