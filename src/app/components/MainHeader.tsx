import Link from 'next/link';
import { FC } from 'react';

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = ({}) => {
  return (
    <header className="w-full h-[100px] flex justify-between items-center p-[10px_50px]">
      <h1 className="text-xl font-[500] select-none">
        Songwriting.io
      </h1>
      <section className="flex items-center gap-4">
        <Link
          className="hover:opacity-75 transition"
          href="/login"
        >
          Login
        </Link>
      </section>
    </header>
  );
}

export default MainHeader;