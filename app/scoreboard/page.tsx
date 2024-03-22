"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../utils/firebase";
import Link from "next/link";
import formatTime from "../utils/formatTime";

interface Score {
  name: string;
  time: number;
}

export default function Scoreboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [scores, setScores] = useState<Score[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        if (!db) {
          setError(
            "Error: Failed to connect to database, please try again later"
          );
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
          return;
        }
        const scoresData = querySnapshot.docs.map((doc) => doc.data() as Score);
        const rankedScores = scoresData.sort((a, b) => a.time - b.time);
        const topFiveScores = rankedScores.slice(0, 5);
        setScores(topFiveScores);
      } catch (error) {
        setError(`Error: Failed to fetch scores, please try again later`);
      }
    };

    fetchScores();
  }, [difficulty]);

  const handleClick = (e: any) => {
    setDifficulty(e.target.dataset.difficulty);
  };

  return (
    <main className="bg-black text-white flex flex-col justify-center h-screen items-center gap-6">
      <h1 className="text-4xl">High scores for {difficulty}</h1>
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
        {error ? (
          <h1 className="text-2xl">{error}</h1>
        ) : (
          <table className="score-board">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{formatTime(item.time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <Link href="/">
          <button className="hover:bg-blue-700 bg-blue-500 rounded-lg p-3">
            Home
          </button>
        </Link>
      </div>
    </main>
  );
}
