"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
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
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  foundCharacters: string[];
  setFoundCharacters: Dispatch<SetStateAction<string[]>>;
  totalSeconds: number;
  setTotalSeconds: Dispatch<SetStateAction<number>>;
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  gameFeedback: string;
  setGameFeedback: Dispatch<SetStateAction<string>>;
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
  zoomLevel: 0,
  setZoomLevel: (): void => {},
  foundCharacters: [],
  setFoundCharacters: (): void => {},
  totalSeconds: 0,
  setTotalSeconds: (): void => {},
  timerActive: false,
  setTimerActive: (): void => {},
  gameOver: false,
  setGameOver: (): void => {},
  gameFeedback: "",
  setGameFeedback: (): void => {},
});

interface GameContextProviderProps {
  children: ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [difficulty, setDifficulty] = useState("");
  const [targetedCoOrds, setTargetedCoOrds] = useState({ x: 0, y: 0 });
  const [popupOpacity, setPopupOpacity] = useState(0);
  const [freezeCrosshair, setFreezeCrosshair] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameFeedback, setGameFeedback] = useState("");

  useEffect(() => {
    if (foundCharacters.length >= 3) {
      setGameOver(true);
    }
  }, [foundCharacters]);

  useEffect(() => {
    if (gameOver) {
      setTimerActive(false);
    }
  }, [gameOver]);

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
        zoomLevel,
        setZoomLevel,
        foundCharacters,
        setFoundCharacters,
        totalSeconds,
        setTotalSeconds,
        timerActive,
        setTimerActive,
        gameOver,
        setGameOver,
        gameFeedback,
        setGameFeedback,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
