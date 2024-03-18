"use client";

import { useState } from "react";
import ImageMagnifier from "./ImageMagnifier";
import SelectPopup from "./SelectPopup";
import wallypic from "../../../public/wallypic.png";
import odlawpic from "../../../public/odlawpic.jpeg";
import wizardpic from "../../../public/wizardpic.png";
import Target from "./Target";
import Image from "next/image";

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
    <div className="flex items-center h-screen w-screen bg-black flex-col justify-center">
      <header className=" flex justify-evenly items-center py-3 top-0 bg-blue-900 w-full absolute">
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

        <div className="bg-white rounded-lg p-3">
          <h1 className="text-4xl">Time: 12.12secs</h1>
        </div>
        <div className="flex gap-3">
          <div className=" flex items-center bg-white rounded-lg p-3">
            <Image
              src={wallypic}
              width={50} // set your desired width here
              height={50}
              alt={""}
            />
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <Image
              src={odlawpic}
              width={50} // set your desired width here
              height={50}
              alt={""}
            />
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <Image
              src={wizardpic}
              width={50} // set your desired width here
              height={50}
              alt={""}
            />
          </div>
        </div>
      </header>
      <div>
        <div onClick={handleClick}>
          <ImageMagnifier
            difficulty={difficulty}
            freezeCrosshair={freezeCrosshair}
            zoomLevel={zoomLevel}
          />
        </div>
      </div>
      <SelectPopup opacity={opacity} position={position} />
    </div>
  );
}
