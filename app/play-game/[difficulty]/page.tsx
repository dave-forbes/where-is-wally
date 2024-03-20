"use client";

import { useEffect, useState } from "react";
import ImageMagnifier from "../../components/ImageMagnifier";
import SelectPopup from "../../components/SelectPopup";
import wallypic from "../../../public/wallypic.png";
import odlawpic from "../../../public/odlawpic.jpeg";
import wizardpic from "../../../public/wizardpic.png";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/global";

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
  } = useGlobalContext();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(0);

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

    const x = targetX / imgW;
    const y = targetY / imgH;
    setTargetedCoOrds({
      x: parseFloat(x.toFixed(2)),
      y: parseFloat(y.toFixed(2)),
    });
  };

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
          <ImageMagnifier difficulty={difficulty} zoomLevel={zoomLevel} />
        </div>
      </div>
      <SelectPopup cursorPosition={cursorPosition} />
    </div>
  );
}
