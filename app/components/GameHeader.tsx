import { useGameContext } from "../Context/GameContext";
import wallypic from "../../public/wallypic.png";
import odlawpic from "../../public/odlawpic.jpeg";
import wizardpic from "../../public/wizardpic.png";
import Image from "next/image";
import CrossSVG from "./CrossSVG";
import Timer from "./Timer";
import Link from "next/link";

export default function GameHeader() {
  const { zoomLevel, setZoomLevel, foundCharacters } = useGameContext();

  const handleZoomLevel = (e: any) => {
    setZoomLevel(e.target.value);
  };

  return (
    <>
      <header className=" flex justify-evenly items-center py-3 top-0 absolute w-screen">
        <div className="flex items-center gap-6 bg-white rounded-lg p-3">
          <h1 className="text-2xl">Zoom level</h1>
          <input
            type="range"
            onChange={handleZoomLevel}
            min="1"
            max="3"
            value={zoomLevel}
          ></input>
        </div>
        <Timer />
        <div className="flex gap-3">
          <div className=" flex items-center bg-white rounded-lg p-3">
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("wally") && <CrossSVG />}
              <Image src={wallypic} width={50} alt={""} />
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("odlaw") && <CrossSVG />}
              <Image src={odlawpic} width={50} alt={""} />
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("wizard") && <CrossSVG />}
              <Image src={wizardpic} width={50} alt={""} />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/">
            <button className="hover:bg-blue-700 bg-blue-500 rounded-lg p-3">
              Home
            </button>
          </Link>
          <Link href="/scoreboard">
            <button className="hover:bg-green-700 bg-green-500 rounded-lg p-3">
              View Scoreboard
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
