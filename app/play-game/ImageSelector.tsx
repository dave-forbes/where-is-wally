"use client";
import React, { useState } from "react";
import Image from "next/image";
import wallyPic from "../../public/48-Where's-Wally-WALKER-BOOKS.jpg";

interface Position {
  x: number;
  y: number;
}

export default function ImageSelector() {
  const [mouseOver, setMouseOver] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div className="relative cursor-none" onMouseMove={handleMouseMove}>
      <Image
        src={wallyPic}
        alt=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        priority={true}
      />
      {mouseOver && (
        <div
          className="border-solid border-2 border-black w-20 h-20 rounded-full absolute"
          style={{
            top: cursorPosition.y,
            left: cursorPosition.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        ></div>
      )}
    </div>
  );
}
