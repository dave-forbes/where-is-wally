import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4 bg-black text-white">
      <h1 className="text-7xl">Where's wally!</h1>
      <h3>(In the UK we call it wally not waldo...)</h3>
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
  );
}
