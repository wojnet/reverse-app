"use client"
import { FC } from 'react';
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import Image from 'next/image';

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = async ({}) => {
  const session = await getServerSession()

  if (session) redirect("/create");

  return (
    <header className="w-full h-[150px] flex justify-center items-center p-[10px_50px]">
      <section className="flex flex-col items-center gap-3 select-none">
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

      </section>
    </header>
  );
}

export default MainHeader;