import Link from "next/link";
import MainHeader from "./components/MainHeader";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Image
        className="fixed opacity-10 blur-[3px] animate-wiggle overflow-x-hidden"
        src="/grid.png"
        alt="grid background"
        width={1000}
        height={1000}
      />
      <Image
        className="fixed opacity-5 blur-[1px] [animation-delay:_-2.5s] animate-wiggle overflow-x-hidden"
        src="/grid.png"
        alt="grid background"
        width={1000}
        height={1000}
      />
      <div className="w-full min-h-screen flex flex-col items-center bg-gradient-bg bg-cover bg-right">
        <MainHeader />
        <main className="w-full h-full flex flex-col items-center gap-5 p-[80px_50px] z-50">
          <h1 className="max-w-[450px] select-none text-center text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500 [text-shadow:_2px_2px_10px_#DDF6]">
            BEST WAY TO WRITE A SONG
          </h1>
          <Link
            className="text-blue-400 bg-white text-lg select-none border border-1 border-blue-400 font-bold p-[3px_8px] rounded-xl shadow-md hover:scale-95 hover:bg-blue-400 hover:text-white transition mb-[100px]"
            href="/create"
          >
            GET STARTED!
          </Link>
        </main>
        <div className="flex-1"></div>
        <footer
          className="h-20 flex items-center"
        >
        <Link
          href="https://github.com/wojnet/reverse-app"
          target="_blank"
        >
          <img
            className="opacity-80 hover:opacity-40 cursor-pointer transition"
            src="/icons/github.svg"
            alt="github link"
          />
        </Link>
        </footer>
      </div>
    </>
  );
}

export default Home;