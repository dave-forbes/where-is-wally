import formatTime from "../utils/formatTime";

interface Score {
  name: string;
  time: number;
}

interface ScoreboardTableProps {
  scores: Score[];
}

export default function ScoreboardTable({ scores }: ScoreboardTableProps) {
  return (
    <table className="score-board">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{formatTime(item.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
