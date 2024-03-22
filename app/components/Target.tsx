import Image, { StaticImageData } from "next/image";
import { useGameContext } from "../Context/GameContext";
import compareCoords from "../utils/compareCoOrds";
import db from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { MouseEvent } from "react";

interface TargetProps {
  src: StaticImageData;
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
    setGameFeedback,
  } = useGameContext();

  useEffect(() => {
    if (!db) {
      setGameFeedback(
        "Error: Cannot connect to server, please try again later."
      );
    }
  }, []);

  const handleClick = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const div = e.target as HTMLDivElement;
    const characterSelection = div.dataset.character;
    if (characterSelection) {
      if (foundCharacters.includes(characterSelection)) {
        setGameFeedback("Character already taken out.");
        return;
      }
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
        if (compareCoords(targetedCoOrds, requestedCoOrds)) {
          setFoundCharacters([...foundCharacters, characterSelection]);
          setGameFeedback("Succesful hit on target.");
        } else {
          setGameFeedback("Incorrect target or not a headshot.");
        }
        setPopupOpacity(0);
        setFreezeCrosshair(false);
      } catch (error) {
        setGameFeedback("Error: Could not fetch data, please try again later");
      }
    }
  };

  return (
    <div className="cursor-pointer border-2 border-transparent hover:border-black transition duration-300 ease-in-outs">
      <Image
        src={src}
        alt={""}
        className="w-20 h-auto"
        onClick={handleClick}
        data-character={character}
      />
    </div>
  );
};

export default Target;
