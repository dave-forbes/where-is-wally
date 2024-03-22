import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center  bg-black text-white ">
      <div className="max-w-[600px] flex justify-center items-center flex-col gap-6 text-center text-lg">
        <h1 className="text-7xl">Where's wally!</h1>
        <h3>(In the UK we call him wally not waldo...)</h3>
        <p>
          Wally and his associates are are wanted by every intellegence agency
          in the world for numourous charges.
        </p>
        <p>You have been assigned to take them out.</p>
        <p>Headshots only please.</p>
        <div className="flex gap-6 items-center">
          <h2 className="text-2xl">Select your mission</h2>
          <div className="flex gap-5">
            <Link href="/play-game/easy">
              <button className="hover:bg-green-700 bg-green-500 rounded-lg p-3">
                Easy
              </button>
            </Link>
            <Link href="/play-game/medium">
              <button className="hover:bg-orange-500 bg-orange-300 rounded-lg p-3">
                Medium
              </button>
            </Link>
            <Link href="/play-game/hard">
              <button className="hover:bg-red-700 bg-red-500 rounded-lg p-3">
                Hard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
