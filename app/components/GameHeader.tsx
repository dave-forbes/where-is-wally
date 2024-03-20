import { useGlobalContext } from "../Context/global";
import wallypic from "../../public/wallypic.png";
import odlawpic from "../../public/odlawpic.jpeg";
import wizardpic from "../../public/wizardpic.png";
import Image from "next/image";

export default function GameHeader() {
  const { zoomLevel, setZoomLevel } = useGlobalContext();

  const handleZoomLevel = (e: any) => {
    setZoomLevel(e.target.value);
  };

  return (
    <>
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
    </>
  );
}
