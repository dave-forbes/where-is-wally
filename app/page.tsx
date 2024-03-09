import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-7xl">Where's wally!</h1>
      <h3>(In the UK we call it wally not waldo...)</h3>
      <Link href="/play game">
        <button className="text-blue-500 hover:text-blue-700">play game</button>
      </Link>
    </div>
  );
}
