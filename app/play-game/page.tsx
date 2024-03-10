"use client";

import ImageMagnifier from "./ImageMagnifier";

export default function Page() {
  const handleClick = (e: any) => {
    console.log({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="flex items-center h-screen w-screen justify-center bg-black"
      onClick={handleClick}
    >
      <ImageMagnifier
        src={"/48-Where's-Wally-WALKER-BOOKS.jpg"}
        width={"900"}
        height={"660"}
      />
    </div>
  );
}
