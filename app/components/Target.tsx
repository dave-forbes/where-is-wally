import Image from "next/image";
import { useGameContext } from "../Context/GameContext";
import compareCoords from "../utils/compareCoOrds";
import db from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface TargetProps {
  src: any;
  character: string;
}

const Target = ({ src, character }: TargetProps) => {
  const {
    difficulty,
    targetedCoOrds,
    setPopupOpacity,
    setFreezeCrosshair,
    setFoundCharacters,
    foundCharacters,
  } = useGameContext();

  const handleClick = async (e: any) => {
    const characterSelection = e.target.dataset.character;
    if (characterSelection) {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "target_co_ords"),
            where("name", "==", characterSelection),
            where("difficulty", "==", difficulty)
          )
        );
        const requestedCoOrds = {
          x: querySnapshot.docs[0].data().x,
          y: querySnapshot.docs[0].data().y,
        };
        console.log(compareCoords(targetedCoOrds, requestedCoOrds));
        if (compareCoords(targetedCoOrds, requestedCoOrds)) {
          setFoundCharacters([...foundCharacters, characterSelection]);
        }
        setPopupOpacity(0);
        setFreezeCrosshair(false);
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
