import { useState } from "react";
import "./ImageMagnifier.css";

//- code taken from this article https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

export default function ImageMagnifier({
  src,
  magnifierHeight = 120,
  magnifierWidth = 120,
  zoomLevel = 0,
  freezeCrosshair,
}: {
  src: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  freezeCrosshair: boolean;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        cursor: "none",
      }}
    >
      <img
        src={src}
        style={{ height: "auto", width: `60vw` }}
        draggable={false}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          if (!freezeCrosshair) {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }
        }}
        onMouseLeave={() => {
          if (!freezeCrosshair) {
            // close magnifier
            setShowMagnifier(false);
          }
        }}
        alt={"img"}
      />

      <div
        id="magnifying-glass"
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "4px solid grey",
          outline: "2px solid black",
          borderRadius: "50%",
          backgroundImage: `url("${src}")`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
