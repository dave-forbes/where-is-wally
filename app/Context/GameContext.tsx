"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface GameContextProps {
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
  targetedCoOrds: { x: number; y: number };
  setTargetedCoOrds: Dispatch<SetStateAction<{ x: number; y: number }>>;
  popupOpacity: number;
  setPopupOpacity: Dispatch<SetStateAction<number>>;
  freezeCrosshair: Boolean;
  setFreezeCrosshair: Dispatch<SetStateAction<boolean>>;
  selectionFeedback: string;
  setSelectionFeedback: Dispatch<SetStateAction<string>>;
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  foundCharacters: string[];
  setFoundCharacters: Dispatch<SetStateAction<string[]>>;
  totalSeconds: number;
  setTotalSeconds: Dispatch<SetStateAction<number>>;
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean; // New state for game over
  setGameOver: Dispatch<SetStateAction<boolean>>; // Function to update game over state
}

const GameContext = createContext<GameContextProps>({
  difficulty: "",
  setDifficulty: (): void => {},
  targetedCoOrds: { x: 0, y: 0 },
  setTargetedCoOrds: (): void => {},
  popupOpacity: 0,
  setPopupOpacity: (): void => {},
  freezeCrosshair: false,
  setFreezeCrosshair: (): void => {},
  selectionFeedback: "",
  setSelectionFeedback: (): void => {},
  zoomLevel: 0,
  setZoomLevel: (): void => {},
  foundCharacters: [],
  setFoundCharacters: (): void => {},
  totalSeconds: 0,
  setTotalSeconds: (): void => {},
  timerActive: false,
  setTimerActive: (): void => {},
  gameOver: false, // Default game over state
  setGameOver: (): void => {}, // Placeholder function
});

export const GameContextProvider = ({ children }: any) => {
  const [difficulty, setDifficulty] = useState("");
  const [targetedCoOrds, setTargetedCoOrds] = useState({ x: 0, y: 0 });
  const [popupOpacity, setPopupOpacity] = useState(0);
  const [freezeCrosshair, setFreezeCrosshair] = useState(false);
  const [selectionFeedback, setSelectionFeedback] = useState("");
  const [zoomLevel, setZoomLevel] = useState(0);
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [gameOver, setGameOver] = useState(false); // Initialize game over state

  // Check for game over condition whenever foundCharacters array is updated
  useEffect(() => {
    if (foundCharacters.length >= 3) {
      setGameOver(true);
      // You can perform any additional actions here when the game is over
    }
  }, [foundCharacters]);

  useEffect(() => {
    if (gameOver) {
      setTimerActive(false);
    }
  });

  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        targetedCoOrds,
        setTargetedCoOrds,
        popupOpacity,
        setPopupOpacity,
        freezeCrosshair,
        setFreezeCrosshair,
        selectionFeedback,
        setSelectionFeedback,
        zoomLevel,
        setZoomLevel,
        foundCharacters,
        setFoundCharacters,
        totalSeconds,
        setTotalSeconds,
        timerActive,
        setTimerActive,
        gameOver, // Pass game over state to context
        setGameOver, // Pass function to update game over state to context
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
