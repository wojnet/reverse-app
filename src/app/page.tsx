import Link from "next/link";
import MainHeader from "./components/MainHeader";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-bg bg-cover bg-right">
      <MainHeader />
      <main className="w-full h-full flex flex-col items-center gap-5 p-[80px_50px]">
        <h1 className="max-w-[450px] select-none text-center text-6xl text-blue-700 font-bold [text-shadow:_2px_2px_10px_#FFF]">
          BEST WAY TO START A SONG
        </h1>
        <Link
          className="text-blue-400 bg-white text-lg select-none border border-1 border-blue-400 font-bold p-[3px_8px] rounded-xl shadow-md hover:scale-95 hover:bg-blue-400 hover:text-white transition mb-[100px]"
          href="/create"
        >
          GET STARTED!
        </Link>
        { [...new Array(5)].map(e => <div className="text-center max-w-[450px] flex flex-col items-center m-5">
          <h2 className="w-fit text-slate-700 text-2xl border border-1 border-slate-600 rounded-xl p-[3px_8px] mb-3">
            {Math.floor(Math.random()*10000)}
          </h2>
          <p className="italic text-slate-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat optio amet maxime. Ex sequi omnis doloribus voluptatum expedita aspernatur, sit magnam nobis tempora iusto velit unde, provident reiciendis totam exercitationem.
          </p>
        </div>) }
      </main>
    </div>
  );
}

export default Home;