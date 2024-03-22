import { useGameContext } from "../Context/GameContext";

export default function GameFeedback() {
  const { gameFeedback } = useGameContext();
  return (
    <h1 className="text-4xl text-white absolute bottom-10">{gameFeedback}</h1>
  );
}
