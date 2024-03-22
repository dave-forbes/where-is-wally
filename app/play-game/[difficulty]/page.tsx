"use client";

import { useEffect, useState, MouseEvent } from "react";
import ImageMagnifier from "../../components/ImageMagnifier";
import SelectPopup from "../../components/SelectPopup";
import { useGameContext } from "@/app/Context/GameContext";
import GameHeader from "@/app/components/GameHeader";
import WinModal from "@/app/components/WinModal";
import GameFeedback from "@/app/components/GameFeedback";
import generateTargedCoOrds from "@/app/utils/generateTargedCoOrds";

interface PlayGameProps {
  params: any;
}

export default function PlayGame({ params }: PlayGameProps) {
  const difficulty = params.difficulty;
  const {
    setDifficulty,
    setTargetedCoOrds,
    popupOpacity,
    setPopupOpacity,
    freezeCrosshair,
    setFreezeCrosshair,
    zoomLevel,
    setTotalSeconds,
    gameFeedback,
    setGameFeedback,
    gameOver,
    setGameOver,
    setFoundCharacters,
  } = useGameContext();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setDifficulty(params.difficulty);
    setTotalSeconds(0);
    setGameFeedback("");
    setGameOver(false);
    setFoundCharacters([]);
  }, []);

  const handleClick = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setPopupOpacity(popupOpacity === 1 ? 0 : 1);
    setFreezeCrosshair(freezeCrosshair === false ? true : false);
    setGameFeedback("");
    setTargetedCoOrds(generateTargedCoOrds(e));
  };

  return (
    <div className="flex items-center h-screen w-screen bg-black flex-col justify-center">
      <GameHeader />
      <main>
        <div onClick={handleClick}>
          <ImageMagnifier difficulty={difficulty} zoomLevel={zoomLevel} />
        </div>
      </main>
      <SelectPopup cursorPosition={cursorPosition} />
      {gameOver && <WinModal />}
      {gameFeedback && <GameFeedback />}
    </div>
  );
}
