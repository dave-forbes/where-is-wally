"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface GlobalContextProps {
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
}

const GlobalContext = createContext<GlobalContextProps>({
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
});

export const GlobalContextProvider = ({ children }: any) => {
  const [difficulty, setDifficulty] = useState("");
  const [targetedCoOrds, setTargetedCoOrds] = useState({ x: 0, y: 0 });
  const [popupOpacity, setPopupOpacity] = useState(0);
  const [freezeCrosshair, setFreezeCrosshair] = useState(false);
  const [selectionFeedback, setSelectionFeedback] = useState("");

  return (
    <GlobalContext.Provider
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
