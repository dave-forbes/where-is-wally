"use client";

import { useState } from "react";
import ImageMagnifier from "./ImageMagnifier";
import SelectPopup from "./SelectPopup";
import Image from "next/image";
import wallyicon from "../../../public/wallyico.png";
import wilmaicon from "../../../public/wilmaico.jpeg";

interface PageProps {
  params: any;
}

export default function Page({ params }: PageProps) {
  const difficulty = params.difficulty;
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleClick = (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setOpacity(opacity === 1 ? 0 : 1);
    setFreezeCrosshair(freezeCrosshair === false ? true : false);
  };
  const [freezeCrosshair, setFreezeCrosshair] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  const handleZoomLevel = (e: any) => {
    setZoomLevel(e.target.value);
  };

  return (
    <div className="flex items-center h-screen w-screen justify-center bg-black flex-col">
      <div>
        <div onClick={handleClick}>
          <ImageMagnifier
            difficulty={difficulty}
            freezeCrosshair={freezeCrosshair}
            zoomLevel={zoomLevel}
          />
        </div>
        <div className="w-full flex justify-evenly items-center pt-5">
          <div className="flex items-center gap-6 bg-white rounded-lg p-3">
            <h1>Zoom level</h1>
            <input
              type="range"
              onChange={handleZoomLevel}
              min="1"
              max="3"
              value={zoomLevel}
            ></input>
          </div>
          <div className="flex items-center gap-6 bg-white rounded-lg p-3">
            <h1>Your Target</h1>
            <Image
              src={difficulty === "hard" ? wilmaicon : wallyicon}
              alt={""}
              className="w-20 h-auto"
            />
          </div>
        </div>
      </div>
      <SelectPopup
        opacity={opacity}
        position={position}
        difficulty={difficulty}
      />
    </div>
  );
}