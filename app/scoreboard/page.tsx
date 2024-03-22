"use client";

import { useEffect, useState, MouseEvent } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../utils/firebase";
import Link from "next/link";
import { useGameContext } from "../Context/GameContext";
import ScreenSizeMessage from "../components/ScreenSizeMessage";
import ScoreboardTable from "../components/ScoreBoardTable";

interface Score {
  name: string;
  time: number;
}

export default function Scoreboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [scores, setScores] = useState<Score[]>([]);
  const [error, setError] = useState("");
  const { screenSize } = useGameContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        if (!db) {
          setError(
            "Error: Failed to connect to database, please try again later"
          );
          setLoading(false);
          return;
        }
        setError("");
        const scoresCollection = collection(db, "scoreboard");
        const q = query(
          scoresCollection,
          where("difficulty", "==", difficulty)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No scores found for this difficulty");
          setLoading(false);
          return;
        }
        const scoresData = querySnapshot.docs.map((doc) => doc.data() as Score);
        const rankedScores = scoresData.sort((a, b) => a.time - b.time);
        const topFiveScores = rankedScores.slice(0, 5);
        setScores(topFiveScores);
        setLoading(false);
      } catch (error) {
        setError(`Error: Failed to fetch scores, please try again later`);
        setLoading(false);
      }
    };

    fetchScores();
  }, [difficulty]);

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const button = e.target as HTMLButtonElement;
    const difficulty = button.dataset.difficulty;
    if (difficulty) setDifficulty(difficulty);
    else {
      setError("Error: Failed to fetch scores");
    }
  };

  return (
    <main className="bg-black text-white flex flex-col justify-center h-screen items-center gap-6">
      {screenSize.width < 1000 || screenSize.height < 600 ? (
        <ScreenSizeMessage />
      ) : (
        <>
          <h1 className="text-4xl">Top 5 scores for {difficulty}</h1>
          <div className="flex gap-5">
            <button
              onClick={handleClick}
              data-difficulty="easy"
              className="hover:bg-green-700 bg-green-500 rounded-lg p-3"
            >
              Easy
            </button>
            <button
              onClick={handleClick}
              data-difficulty="medium"
              className="hover:bg-orange-500 bg-orange-300 rounded-lg p-3"
            >
              Medium
            </button>
            <button
              onClick={handleClick}
              data-difficulty="hard"
              className="hover:bg-red-700 bg-red-500 rounded-lg p-3"
            >
              Hard
            </button>
          </div>
          <div>
            {loading && <h1 className="text-2xl">Fetching scores...</h1>}
            {error && <h1 className="text-2xl">{error}</h1>}
            {!loading && !error && <ScoreboardTable scores={scores} />}
          </div>
          <div>
            <Link href="/">
              <button className="hover:bg-blue-700 bg-blue-500 rounded-lg p-3">
                Home
              </button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
