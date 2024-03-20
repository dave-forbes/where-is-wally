import { useGameContext } from "../Context/GameContext";
import wallypic from "../../public/wallypic.png";
import odlawpic from "../../public/odlawpic.jpeg";
import wizardpic from "../../public/wizardpic.png";
import Image from "next/image";
import CrossSVG from "./CrossSVG";

export default function GameHeader() {
  const { zoomLevel, setZoomLevel, foundCharacters } = useGameContext();

  const handleZoomLevel = (e: any) => {
    setZoomLevel(e.target.value);
  };

  return (
    <>
      <header className=" flex justify-evenly items-center py-3 top-0 bg-blue-950  w-full absolute">
        <h1 className="text-white text-4xl">Where's wally</h1>
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
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("wally") && <CrossSVG />}
              <Image src={wallypic} width={50} height={50} alt={""} />
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("odlaw") && <CrossSVG />}
              <Image src={odlawpic} width={50} height={50} alt={""} />
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3">
            <div style={{ position: "relative" }}>
              {foundCharacters.includes("wizard") && <CrossSVG />}
              <Image src={wizardpic} width={50} height={50} alt={""} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
