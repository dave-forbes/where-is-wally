export default function formatTime(time: number) {
  // Calculate minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Format minutes and seconds to two decimal places
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}m ${formattedSeconds}s`;
}
