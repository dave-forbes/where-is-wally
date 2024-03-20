interface Coords {
  x: number;
  y: number;
}

export default function compareCoords(coord1: Coords, coord2: Coords): boolean {
  const varianceAmountX = 0.005;
  const varianceAmountY = 0.01;

  const withinRange = (
    val1: number,
    val2: number,
    varianceAmount: number
  ): boolean => {
    const result = Math.abs(val1 - val2);
    const result2DP = parseFloat(result.toFixed(2));
    return result2DP <= varianceAmount;
  };

  return (
    withinRange(coord1.x, coord2.x, varianceAmountX) &&
    withinRange(coord1.y, coord2.y, varianceAmountY)
  );
}
