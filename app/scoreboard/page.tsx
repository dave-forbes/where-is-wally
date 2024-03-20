"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../utils/firebase"; // Assuming this is where you have your Firebase configuration
import Link from "next/link";

// Define the type for a single score entry
interface Score {
  name: string;
  time: number;
}

export default function Scoreboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [scores, setScores] = useState<Score[]>([]); // Explicitly define the state type as an array of Score objects

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresCollection = collection(db, "scoreboard");
        const q = query(
          scoresCollection,
          where("difficulty", "==", difficulty)
        );
        const querySnapshot = await getDocs(q);
        const scoresData = querySnapshot.docs.map((doc) => doc.data() as Score); // Cast each document data to Score type
        setScores(scoresData);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [difficulty]);

  const handleClick = (e: any) => {
    setDifficulty(e.target.dataset.difficulty);
  };

  return (
    <main className="bg-black text-white flex flex-col justify-center h-screen items-center gap-6">
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
        <h2>Scores for {difficulty} difficulty:</h2>
        <ul>
          {scores.map((score: Score, index: number) => (
            <li key={index}>
              {score.name}: {score.time}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link href="/">
          <button className="hover:bg-green-700 bg-blue-500 rounded-lg p-3">
            Home
          </button>
        </Link>
      </div>
    </main>
  );
}
