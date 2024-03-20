"use client";

import { useEffect, useState } from "react";
import ImageMagnifier from "../../components/ImageMagnifier";
import SelectPopup from "../../components/SelectPopup";
import { useGameContext } from "@/app/Context/GameContext";
import GameHeader from "@/app/components/GameHeader";
import WinModal from "@/app/components/WinModal";

interface PageProps {
  params: any;
}

export default function Page({ params }: PageProps) {
  const difficulty = params.difficulty;
  const {
    setDifficulty,
    setTargetedCoOrds,
    popupOpacity,
    setPopupOpacity,
    freezeCrosshair,
    setFreezeCrosshair,
    zoomLevel,
  } = useGameContext();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setDifficulty(params.difficulty);
  }, []);

  const handleClick = async (e: any) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setPopupOpacity(popupOpacity === 1 ? 0 : 1);
    setFreezeCrosshair(freezeCrosshair === false ? true : false);
    const clickX = e.clientX;
    const clickY = e.clientY;
    const imgW = e.target.offsetWidth;
    const imgH = e.target.offsetHeight;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    // click relative to img
    const targetX = clickX - (winW - imgW) / 2;
    const targetY = clickY - (winH - imgH) / 2;
    // convert to ratio
    const x = targetX / imgW;
    const y = targetY / imgH;
    // set to floating point with 2 decimal places
    setTargetedCoOrds({
      x: parseFloat(x.toFixed(2)),
      y: parseFloat(y.toFixed(2)),
    });
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
      <WinModal />
    </div>
  );
}
