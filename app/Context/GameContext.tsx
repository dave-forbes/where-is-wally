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
  screenSize: { width: number; height: number };
  setScreenSize: Dispatch<SetStateAction<{ width: number; height: number }>>;
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
  screenSize: { width: 0, height: 0 },
  setScreenSize: (): void => {},
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
  const [screenSize, setScreenSize] = useState({ width: 1000, height: 600 });

  // set screen size when loading or resizing any page

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // end game if 3 characters found

  useEffect(() => {
    if (foundCharacters.length >= 3) {
      setGameOver(true);
    }
  }, [foundCharacters]);

  // when game ended, stop timer

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
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
