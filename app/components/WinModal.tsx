import React, { useState } from "react";
import { useGameContext } from "../Context/GameContext";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firebase";

const WinModal = () => {
  const {
    gameOver,
    setGameOver,
    setFoundCharacters,
    difficulty,
    totalSeconds,
  } = useGameContext();
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds to two decimal places
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const data = {
      name: playerName,
      difficulty: difficulty,
      time: `${formattedMinutes}m ${formattedSeconds}s`,
    };
    try {
      const docRef = await addDoc(collection(db, "scoreboard"), data);
      console.log("Document added with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
    setFoundCharacters([]);
    setGameOver(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h1>Score submited</h1>
          {difficulty !== "hard" && (
            <Link
              href={
                difficulty === "easy" ? "/play-game/medium" : "/play-game/hard"
              }
            >
              <button className="hover:bg-green-700 bg-green-500 rounded-lg p-3">
                Next Level
              </button>
            </Link>
          )}
          <Link href="/scoreboard">
            <button className="hover:bg-green-700 bg-blue-500 rounded-lg p-3">
              View Scoreboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (gameOver && !submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Congratulations! You won!</h2>
          <form onSubmit={handleSubmit} className=" flex flex-col">
            <label>
              Enter your name:
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Score</button>
          </form>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WinModal;
