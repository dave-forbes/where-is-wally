import React, { useState } from "react";
import { useGameContext } from "../Context/GameContext";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/firebase";

const WinModal = () => {
  const { setFoundCharacters, difficulty, totalSeconds } = useGameContext();
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: playerName,
      difficulty: difficulty,
      time: totalSeconds,
    };
    try {
      await addDoc(collection(db, "scoreboard"), data);
    } catch (error: any) {
      setError("Error: Failed to submit score, please try again later");
    }
    setFoundCharacters([]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal-content flex flex-col gap-6 items-center">
          {error ? (
            <h1 className="text-2xl">{error}</h1>
          ) : (
            <>
              <h1 className="text-2xl">Score submited</h1>
              {difficulty !== "hard" && (
                <Link
                  href={
                    difficulty === "easy"
                      ? "/play-game/medium"
                      : "/play-game/hard"
                  }
                >
                  <button className="hover:bg-green-700 bg-green-500 rounded-lg p-3">
                    Next Level
                  </button>
                </Link>
              )}
              <Link href="/scoreboard">
                <button className="hover:bg-blue-700 bg-blue-500 rounded-lg p-3">
                  View Scoreboard
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal-overlay">
        <div className="modal-content  flex flex-col gap-6 items-center">
          <h2 className="text-2xl">Mission completed!</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <label className="flex flex-col gap-3 items-center">
              Enter your name
              <input
                className="border-2 border-black rounded-lg p-1"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </label>
            <button
              className="hover:bg-green-700 bg-green-500 rounded-lg p-3"
              type="submit"
            >
              Submit Score
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default WinModal;
