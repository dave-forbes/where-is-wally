"use client";

import { useEffect, useState, MouseEvent } from "react";
import ImageMagnifier from "@/app/components/ImageMagnifier";
import SelectPopup from "@/app/components/SelectPopup";
import { useGameContext } from "@/app/Context/GameContext";
import GameHeader from "@/app/components/GameHeader";
import WinModal from "@/app/components/WinModal";
import GameFeedback from "@/app/components/GameFeedback";
import generateTargetCoOrds from "@/app/utils/generateTargetCoOrds";
import { useParams } from "next/navigation";
import ScreenSizeMessage from "@/app/components/ScreenSizeMessage";

export default function PlayGame() {
  const { difficulty } = useParams();
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
    screenSize,
  } = useGameContext();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setDifficulty(difficulty.toString());
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
    setTargetedCoOrds(generateTargetCoOrds(e));
  };

  return (
    <div className="flex items-center h-screen w-screen bg-black flex-col justify-center">
      {screenSize.width < 1000 || screenSize.height < 600 ? (
        <ScreenSizeMessage />
      ) : (
        <>
          <GameHeader />
          <main>
            <div onClick={handleClick}>
              <ImageMagnifier
                difficulty={difficulty.toString()}
                zoomLevel={zoomLevel}
              />
            </div>
          </main>
          <SelectPopup cursorPosition={cursorPosition} />
          {gameOver && <WinModal />}
          {gameFeedback && <GameFeedback />}
        </>
      )}
    </div>
  );
}
