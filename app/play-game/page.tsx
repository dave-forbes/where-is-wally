"use client";

import { useState } from "react";
import ImageMagnifier from "./ImageMagnifier";
import SelectPopup from "./SelectPopup";

export default function Page() {
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleClick = (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setOpacity(opacity === 1 ? 0 : 1);
  };

  return (
    <div className="flex items-center h-screen w-screen justify-center bg-black">
      <div onClick={handleClick}>
        <ImageMagnifier
          src={"/where-is-wally-easy.jpg"}
          width={"900"}
          height={"660"}
        />
      </div>
      <SelectPopup opacity={opacity} position={position} />
    </div>
  );
}
