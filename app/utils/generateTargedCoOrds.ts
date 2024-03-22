import { MouseEvent } from "react";

export default function generateTargedCoOrds(
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
) {
  const clickX = e.clientX;
  const clickY = e.clientY;
  const img = e.target as HTMLImageElement;
  const imgW = img.offsetWidth;
  const imgH = img.offsetHeight;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  // click relative to img
  const targetX = clickX - (winW - imgW) / 2;
  const targetY = clickY - (winH - imgH) / 2;
  // convert to ratio
  const x = targetX / imgW;
  const y = targetY / imgH;
  // round to 2dp
  const targetCoOrds = {
    x: parseFloat(x.toFixed(2)),
    y: parseFloat(y.toFixed(2)),
  };
  return targetCoOrds;
}
