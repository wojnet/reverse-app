import Link from "next/link";
import MainHeader from "./components/MainHeader";
import Image from "next/image";

const Home = () => {
  return (
    <>
    <Image
        className="fixed opacity-10 blur-[2px]"
        src="/grid.png"
        alt="grid background"
        width={1000}
        height={1000}
      />
      <div className="w-full min-h-screen flex flex-col items-center bg-gradient-bg bg-cover bg-right">
        <MainHeader />
        <main className="w-full h-full flex flex-col items-center gap-5 p-[80px_50px] z-50">
          <h1 className="max-w-[450px] select-none text-center text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500 [text-shadow:_2px_2px_10px_#DDF6]">
            BEST WAY TO START A SONG
          </h1>
          <Link
            className="text-blue-400 bg-white text-lg select-none border border-1 border-blue-400 font-bold p-[3px_8px] rounded-xl shadow-md hover:scale-95 hover:bg-blue-400 hover:text-white transition mb-[100px]"
            href="/create"
          >
            GET STARTED!
          </Link>
        </main>
      </div>
    </>
  );
}

export default Home;