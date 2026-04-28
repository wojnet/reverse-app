import Link from "next/link";
import MainHeader from "./components/MainHeader";
import Image from "next/image";
import CookieConsentComponent from "./components/CookieConsent";

const Home = () => {
  return (
    <>
      {/* <Image
        className="fixed opacity-10 blur-[3px] animate-wiggle overflow-x-hidden"
        src="/grid.png"
        alt="grid background"
        width={1000}
        height={1000}
      /> */}
      {/* <Image
        className="fixed opacity-5 blur-[1px] [animation-delay:_-2.5s] animate-wiggle overflow-x-hidden"
        src="/grid.png"
        alt="grid background"
        width={1000}
        height={1000}
      /> */}
      <div className="w-full min-h-screen flex flex-col items-center bg-gradient-bg bg-cover bg-right">
        <MainHeader />
        <main className="flex-1 w-full flex flex-col items-center justify-center gap-6 p-[0_50px_80px] z-50">
          <h1 className="max-w-[450px] select-none text-center text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 [text-shadow:_2px_2px_10px_#DDF2] mt-28">
            BEST WAY TO WRITE A SONG
          </h1>
          <div className="flex gap-8 text-xs text-indigo-600 opacity-70 select-none tracking-widest uppercase">
            <span>Chord Sheets</span>
            <span>·</span>
            <span>Lyrics</span>
            <span>·</span>
            <span>Structure</span>
          </div>
          <br />
          <Link
            className="text-blue-400 bg-white text-lg select-none border border-1 border-blue-400 font-bold p-[3px_8px] rounded-xl shadow-md hover:scale-95 hover:bg-blue-400 hover:text-white transition mb-28"
            href="/create"
            prefetch={false}
          >
            GET STARTED!
          </Link>
          <CookieConsentComponent />
          <Link
            className="text-center text-xs text-indigo-600 opacity-90 z-[1000] hover:opacity-70 hover:italic transition"
            href="https://www.freeprivacypolicy.com/live/d3eb1697-3ef6-48e2-ad1b-5794d4d80f45"
            prefetch={false}
          >
            PRIVACY POLICY
          </Link>
        </main>
        <footer
          className="h-20 flex items-center"
        >
        <Link
          href="https://github.com/wojnet/reverse-app"
          target="_blank"
          prefetch={false}
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