import Image from "next/image";
import { useGlobalContext } from "../Context/global";
import { db } from "../lib/pocketbase";
import compareCoords from "../utils/compareCoOrds";

interface TargetProps {
  src: any;
  character: string;
}

const Target = ({ src, character }: TargetProps) => {
  const { difficulty, targetedCoOrds, setPopupOpacity, setFreezeCrosshair } =
    useGlobalContext();

  const handleClick = async (e: any) => {
    const characterSelection = e.target.dataset.character;
    if (characterSelection) {
      try {
        const data = await db.collection("target_co_ords").getList(1, 50, {
          filter: `difficulty="${difficulty}" && name="${characterSelection}"`,
        });
        const requestedCoOrds = { x: data.items[0].x, y: data.items[0].y };

        console.log(requestedCoOrds);
        console.log(targetedCoOrds);

        console.log(compareCoords(targetedCoOrds, requestedCoOrds));

        if (compareCoords(targetedCoOrds, requestedCoOrds)) {
          setPopupOpacity(0);
          setFreezeCrosshair(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="cursor-pointer border-2 border-transparent hover:border-black transition duration-300 ease-in-outs">
      <Image
        src={src}
        alt={""}
        className="w-20 h-auto "
        onClick={handleClick}
        data-character={character}
      />
    </div>
  );
};

export default Target;
